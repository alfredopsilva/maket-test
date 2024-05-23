import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { EditProfileSchema } from './definitions';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
