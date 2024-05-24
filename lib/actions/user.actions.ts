'use server';
import { Prisma, PrismaClient, User } from '@prisma/client';
const bcrypt = require('bcrypt');
import fs from 'fs';
import path from 'path';
import { UpdateUserResponse } from '@/types';

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
    fields: { [key: string]: any }
): Promise<UpdateUserResponse> {
    const db = new PrismaClient();
    try {
        // Check if passwords match
        if (fields.password !== fields.repeatPassword) {
            return {
                message: 'Passwords do not match',
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

        if (fields.profileImage) {
            updateData.profileImage = fields.profileImage;
        }
        if (hashedPassword) {
            updateData.password = hashedPassword;
        }

        // Update the user in the database
        const user = await db.user.update({
            where: { id: id },
            data: updateData,
        });

        if (!user) {
            return { message: 'User not found' };
        }

        return {
            message: 'Profile updated successfully',
            redirectUrl: `${BASE_URL}/profile/${id}`,
        };
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred while updating the profile' };
    } finally {
        await db.$disconnect();
    }
}

export type CreateUserResponse = {
    message: string;
    redirectUrl?: string;
};
export async function createUser(fields: {
    [key: string]: any;
}): Promise<CreateUserResponse> {
    const db = new PrismaClient();
    try {
        // Check if passwords match
        if (fields.password !== fields.repeatPassword) {
            return { message: 'Passwords do not match' };
        }

        console.log(fields);

        if (fields.password.length < 4) {
            return { message: 'Password must be at least 4 characters' };
        }
        // Hash password if provided
        const hashedPassword = await bcrypt.hash(fields.password, 10);

        // Prepare data to create
        const createData: Prisma.UserCreateInput = {
            firstName: fields.firstName,
            lastName: fields.lastName,
            email: fields.email,
            bio: fields.bio,
            password: hashedPassword,
            profileImage: fields.profileImage,
            isAdmin: false,
        };

        const user = await db.user.create({
            data: createData,
        });

        return {
            message: 'User created successfully',
            redirectUrl: `${BASE_URL}/login`,
        };
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred while creating the user' };
    } finally {
        await db.$disconnect();
    }
}
