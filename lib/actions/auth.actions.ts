'use server';
import { getUserByEmail } from './user.actions';
import { LoginParams } from '@/types';
const bcrypt = require('bcrypt');
import { LoginResponse } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function login(loginData: LoginParams): Promise<LoginResponse> {
    const { email, password } = loginData;

    const user = await getUserByEmail(email);

    console.log(`Estou no login.ts e o user é: ${password}`);
    if (!user) {
        console.log('User not found');
        return {
            errors: {
                email: ['Please check your email and password'],
            },
        };
    }

    const isValidPassword = await checkPassword(password, user.password);

    if (!isValidPassword) {
        console.log('Invalid password');
        return {
            errors: {
                password: ['Please check your email and password'],
            },
        };
    } else {
        // User authenticated successfully, redirect to profile
        const profileUrl = `${BASE_URL}/profile/${user.id}`;
        return { redirectUrl: profileUrl };
    }
}

const checkPassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
};
