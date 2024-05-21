"use server";
import { UserParams } from "@/types";
import { PrismaClient, User } from "@prisma/client";
const bcrypt = require("bcrypt");

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getUserById(id: string) {
  const db = new PrismaClient();
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  } finally {
    await db.$disconnect();
  }
}

export async function getUserByEmail(email: string) {
  const db = new PrismaClient();
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  } finally {
    await db.$disconnect();
  }
}

export async function updateUser(id: string, data: UserParams) {
  const db = new PrismaClient();
  try {
    if (data.password !== data.repeatPassword) {
      return {
        errors: {
          password: ["Passwords do not match"],
          repeatPassword: ["Passwords do not match"],
        },
      };
    }
    let hashedPassword;
    if (data.password && data.password.length > 0) {
      hashedPassword = await bcrypt.hash(data.password, 10);
    }

    const updateData: any = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      bio: data.bio,
    };

    if (hashedPassword) {
      updateData.password = hashedPassword;
    }
    const user = await db.user.update({
      where: {
        id: id,
      },
      data: updateData,
    });
    if (!user) {
      return { message: "User not found" };
    } else {
      const profileUrl = `${BASE_URL}/profile/${user.id}`;
      return { redirectUrl: profileUrl };
    }
  } catch (error) {
    console.log(error);
  } finally {
    await db.$disconnect();
  }
}
