import Link from "next/link";

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
import { actions } from "@/data/actions";

export function SignupForm() {
  return (
    <div className="w-full max-w-md">
      <form action={actions.auth.registerUserAction}>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Create an account to start using SummarizeAI
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" type="text" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button className="w-full">Sign Up</Button>

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