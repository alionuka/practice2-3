"use client";

import { useActionState } from "react";
import Link from "next/link";
import { actions } from "@/data/actions";
import { type FormState } from "@/data/validation/auth";
import { StrapiErrors } from "@/components/custom/strapi-errors";

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

const INITIAL_STATE: FormState = {
  success: false,
  message: undefined,
  strapiErrors: null,
  zodErrors: null,
};

export function SignupForm() {
  const [formState, formAction] = useActionState(
    actions.auth.registerUserAction,
    INITIAL_STATE
  );

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-pink-500">
              Sign Up
            </CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" type="text" />
              <ZodErrors error={formState?.zodErrors?.username} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" />
              <ZodErrors error={formState?.zodErrors?.email} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" />
              <ZodErrors error={formState?.zodErrors?.password} />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>

            <StrapiErrors error={formState?.strapiErrors} />
            
            <p className="mt-4 text-center text-sm">
              Already have an account?
              <Link href="/signin" className="ml-2 text-pink-500">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}