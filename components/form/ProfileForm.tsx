'use client';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreateProfileSchema, EditProfileSchema } from '@/lib/definitions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    CreateUserResponse,
    createUser,
    updateUser,
} from '@/lib/actions/user.actions';
import { UpdateUserResponse } from '@/types';
import { User } from '@prisma/client';
interface EditProfileFormProps {
    user?: string;
}

const ProfileForm = ({ user }: EditProfileFormProps) => {
    // Check if there is a user or not to parse it. If there is, the component will be in edit mode. Otherwise it will be in create mode.
    let parsedUser: User | null = null;
    if (user !== undefined) {
        try {
            parsedUser = JSON.parse(user);
        } catch (error) {
            console.error(error);
        }
    }

    // Create this state to show global errors.
    const [message, setMessage] = useState('');
    const schema = parsedUser ? EditProfileSchema : CreateProfileSchema;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: parsedUser?.firstName || '',
            lastName: parsedUser?.lastName || '',
            email: parsedUser?.email || '',
            password: '',
            repeatPassword: '',
            profileImage: '',
            bio: parsedUser?.bio || '',
        },
    });

    const onSubmit = async (data: any) => {
        let response: UpdateUserResponse | CreateUserResponse | null = null;

        if (parsedUser !== null) {
            response = await updateUser(parsedUser.id, data);
        } else {
            response = await createUser(data);
        }

        if (response?.redirectUrl) {
            setMessage(`${response.message}`);
            setTimeout(() => {
                // NOTE: Try to find a better way to redirect.
                // BUG: Is removing isLoggedIn context.
                window.location.href = response.redirectUrl as string;
            }, 3000);
        } else if (response?.message) {
            setMessage(response.message);
        }
    };

    return (
        <form
            className="grid gap-4"
            data-cy="profile-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="grid gap-4 grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="first-name" data-cy="first-name-label">
                        First Name
                    </Label>
                    <Input
                        id="first-name"
                        type="text"
                        data-cy="first-name-input"
                        placeholder="John"
                        {...register('firstName')}
                    />
                    {errors.firstName && (
                        <p
                            className="text-sm text-red-700"
                            data-cy="first-name-error"
                        >
                            {errors.firstName.message}
                        </p>
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="last-name" data-cy="last-name-label">
                        Last Name
                    </Label>
                    <Input
                        data-cy="last-name-input"
                        id="last-name"
                        type="text"
                        placeholder="Doe"
                        {...register('lastName')}
                    />
                    {errors.lastName && (
                        <p
                            className="text-sm text-red-700"
                            data-cy="last-name-error"
                        >
                            {errors.lastName.message}
                        </p>
                    )}
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email" data-cy="email-label">
                    Email
                </Label>
                <Input
                    id="email"
                    data-cy="email-input"
                    type="email"
                    placeholder="m@example.com"
                    {...register('email')}
                />
                {errors.email && (
                    <p className="text-sm text-red-700" data-cy="email-error">
                        {errors.email.message}
                    </p>
                )}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password" data-cy="password-label">
                    Password
                </Label>
                <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    data-cy="password-input"
                />
                {errors.password && (
                    <p
                        className="text-sm text-red-700"
                        data-cy="password-error"
                    >
                        {errors.password.message}
                    </p>
                )}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="repeatPassword" data-cy="repeat-password-label">
                    Repeat Password
                </Label>
                <Input
                    id="repeatPassword"
                    data-cy="repeat-password-input"
                    type="password"
                    {...register('repeatPassword')}
                />
                {errors.repeatPassword && (
                    <p
                        data-cy="repeat-password-error"
                        className="text-sm text-red-700"
                    >
                        {errors.repeatPassword.message}
                    </p>
                )}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="profile-image" data-cy="profile-avatar-label">
                    Profile Image URL
                </Label>
                <Input
                    data-cy="profile-avatar-input"
                    id="profile-image"
                    type="text"
                    className=""
                    {...register('profileImage')}
                />
                {errors.profileImage && (
                    <p
                        className="text-sm text-red-700"
                        data-cy="profile-image-error"
                    >
                        {errors.profileImage.message}
                    </p>
                )}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="bio" data-cy="bio-label">
                    Bio
                </Label>
                <Textarea
                    id="bio"
                    data-cy="bio-input"
                    placeholder="Write something about yourself"
                    className="min-h-40"
                    {...register('bio')}
                />
                {errors.bio && (
                    <p className="text-sm text-red-700" data-cy="bio-error">
                        {errors.bio.message}
                    </p>
                )}
            </div>
            <Button
                type="submit"
                className="w-full dark:bg-accentColor"
                data-cy="submit-btn"
            >
                {parsedUser ? 'Edit' : 'Create'}
            </Button>
            {message && (
                <p className="text-sm text-center" data-cy="returned-message">
                    {message}
                </p>
            )}
        </form>
    );
};

export default ProfileForm;
