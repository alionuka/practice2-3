"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { services } from "@/data/services";
import { isAuthError } from "@/data/services/auth";
import {
  SigninFormSchema,
  SignupFormSchema,
  type FormState,
} from "@/data/validation/auth";

const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export async function registerUserAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const fields = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = SignupFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message: "Validation failed",
      strapiErrors: null,
      zodErrors: flattenedErrors.fieldErrors,
      data: fields,
    };
  }

  const responseData = await services.auth.registerUserService(
    validatedFields.data
  );

  if (!responseData) {
    return {
      success: false,
      message: "Ops! Something went wrong. Please try again.",
      strapiErrors: null,
      zodErrors: null,
      data: fields,
    };
  }

  if (isAuthError(responseData)) {
    return {
      success: false,
      message: "Failed to Register.",
      strapiErrors: responseData.error,
      zodErrors: null,
      data: fields,
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("jwt", responseData.jwt, cookieConfig);

  redirect("/dashboard");
}

export async function loginUserAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const fields = {
    identifier: formData.get("identifier") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = SigninFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message: "Validation failed",
      strapiErrors: null,
      zodErrors: flattenedErrors.fieldErrors,
      data: fields,
    };
  }

  const responseData = await services.auth.loginUserService(
    validatedFields.data
  );

  if (!responseData) {
    return {
      success: false,
      message: "Ops! Something went wrong. Please try again.",
      strapiErrors: null,
      zodErrors: null,
      data: fields,
    };
  }

  if (isAuthError(responseData)) {
    return {
      success: false,
      message: "Failed to Login.",
      strapiErrors: responseData.error,
      zodErrors: null,
      data: fields,
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("jwt", responseData.jwt, cookieConfig);

  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.set("jwt", "", {
    ...cookieConfig,
    maxAge: 0,
  });

  redirect("/signin");
}

export async function getAuthTokenAction() {
  const cookieStore = await cookies();
  return cookieStore.get("jwt")?.value;
}