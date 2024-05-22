"use server";
import { PrismaClient, User } from "@prisma/client";
const bcrypt = require("bcrypt");
import fs from "fs";
import path from "path";
import { UpdateUserResponse } from "@/types";

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

export async function updateUser(
  id: string,
  formData: FormData,
): Promise<UpdateUserResponse> {
  const db = new PrismaClient();
  try {
    const fields: { [key: string]: any } = {};
    let profileImage: File | null = null;

    // Iterate over formData to handle fields and files
    formData.forEach((value, key) => {
      if (key === "profileImage" && value instanceof File) {
        profileImage = value;
      } else {
        fields[key] = value;
      }
    });

    // Check if passwords match
    if (fields.password !== fields.repeatPassword) {
      return {
        message: "Passwords do not match",
      };
    }

    // Hash password if provided
    let hashedPassword;
    if (fields.password && fields.password.length > 0) {
      hashedPassword = await bcrypt.hash(fields.password, 10);
    }

    // Prepare data to update
    const updateData: { [key: string]: any } = {
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      bio: fields.bio,
    };

    if (hashedPassword) {
      updateData.password = hashedPassword;
    }

    // Handle profile photo if provided
    if (profileImage) {
      const uploadDir = path.join(process.cwd(), "public/uploads");

      // Ensure the upload directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const newFileName = `${Date.now()}_${formData.get("firstName")}_${formData.get("lastName")}`;
      const filePath = path.join(uploadDir, newFileName);

      // Read the file buffer and save it
      // NOTE: Check how to pass the correct type of this arrayBuffer.
      const buffer = Buffer.from(await profileImage.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      updateData.profileImage = `/uploads/${newFileName}`;
    }

    // Update the user in the database
    const user = await db.user.update({
      where: { id: id },
      data: updateData,
    });

    if (!user) {
      return { message: "User not found" };
    }

    return {
      message: "Profile updated successfully",
      redirectUrl: `${BASE_URL}/profile/${id}`,
    };
  } catch (error) {
    console.error(error);
    return { message: "An error occurred while updating the profile" };
  } finally {
    await db.$disconnect();
  }
}
