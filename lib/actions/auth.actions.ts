"use server";

import { NextResponse } from "next/server";
import { LoginFormSchema } from "../definitions";
import { getUserByEmail } from "./user.actions";
const bcrypt = require("bcrypt");

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function login(formData: FormData) {
  const validateFields = LoginFormSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validateFields.success) {
    console.log(validateFields.error.flatten().fieldErrors);
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const user = await getUserByEmail(validateFields.data.email);
  if (!user) {
    return {
      errors: {
        email: ["User not found"],
      },
    };
  }

  const isValidPassword = await checkPassword(
    validateFields.data.password,
    user.password,
  );

  if (!isValidPassword) {
    return {
      errors: {
        password: ["Invalid password"],
      },
    };
  } else {
    console.log(isValidPassword);
    // User authenticated successfully, redirect to profile
    const profileUrl = `${BASE_URL}/signup`;
    return NextResponse.redirect(profileUrl);
  }
}

const checkPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};
