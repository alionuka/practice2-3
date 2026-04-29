"use server";

import { z } from "zod";
import { services } from "@/data/services";
import { isAuthError } from "@/data/services/auth";
import {
  SigninFormSchema,
  SignupFormSchema,
  type FormState,
} from "@/data/validation/auth";
import { cookies } from "next/headers";

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

  console.log("#############");
  console.log("User Registered Successfully", responseData);
  console.log("#############");

  const cookieStore = await cookies();

cookieStore.set("jwt", responseData.jwt, {
  httpOnly: true,
  secure: false,
  path: "/",
});

  return {
    success: true,
    message: "User registration successful",
    strapiErrors: null,
    zodErrors: null,
    data: fields,
  };
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

  console.log("#############");
  console.log("User Logged In Successfully", responseData);
  console.log("#############");

const cookieStore = await cookies();

cookieStore.set("jwt", responseData.jwt, {
  httpOnly: true,
  secure: false,
  path: "/",
});

  return {
    success: true,
    message: "User login successful",
    strapiErrors: null,
    zodErrors: null,
    data: fields,
  };
}