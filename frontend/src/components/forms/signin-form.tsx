"use client";

import { useActionState } from "react";
import Link from "next/link";
import { actions } from "@/data/actions";
import { type FormState } from "@/data/validation/auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ZodErrors } from "@/components/custom/zod-errors";
import { StrapiErrors } from "@/components/custom/strapi-errors";

const INITIAL_STATE: FormState = {
  success: false,
  message: undefined,
  strapiErrors: null,
  zodErrors: null,
};

export function SigninForm() {
  const [formState, formAction] = useActionState(
    actions.auth.loginUserAction,
    INITIAL_STATE
  );

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-pink-500">
              Sign In
            </CardTitle>
            <CardDescription>
              Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Email</Label>
              <Input id="identifier" name="identifier" type="email" />
              <ZodErrors error={formState?.zodErrors?.identifier} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" />
              <ZodErrors error={formState?.zodErrors?.password} />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full">
              Sign In
            </Button>

            <StrapiErrors error={formState?.strapiErrors} />

            <p className="mt-4 text-center text-sm">
              Don&apos;t have an account?
              <Link href="/signup" className="ml-2 text-pink-500">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}