"use server";
import { PrismaClient } from "@prisma/client";

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
