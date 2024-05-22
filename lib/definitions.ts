import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(4),
});

export const EditProfileSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First Name must be at least 3 characters" })
    .optional(),
  lastName: z
    .string()
    .min(3, { message: "Last Name must be at least 3 characters" })
    .optional(),
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
  profileImage: z.any().optional(),
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
