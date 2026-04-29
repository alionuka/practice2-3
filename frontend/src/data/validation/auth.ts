import { z } from "zod";

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(20, { message: "Username must be less than 20 characters." }),

  email: z.string().email({ message: "Please enter a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export const SigninFormSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Email or username is required." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export type FormState = {
  success: boolean;
  message?: string;
  strapiErrors: null | {
    status: number;
    name: string;
    message: string;
    details?: unknown;
  };
  zodErrors: null | {
    username?: string[];
    email?: string[];
    password?: string[];
    identifier?: string[];
  };
  data?: unknown;
};