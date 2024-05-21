import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(4),
});

export const EditProfileSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  email: z.string().email({ message: "Please enter a valid email" }).optional(),
  password: z
    .string()
    .refine((val) => val.length === 0 || val.length >= 4, {
      message: "String must contain at least 4 character(s)",
    })
    .optional(),
  repeatPassword: z
    .string()
    .refine((val) => val.length === 0 || val.length >= 4, {
      message: "String must contain at least 4 character(s)",
    })
    .optional(),
  bio: z.string().min(10).max(500).optional(),
});

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
