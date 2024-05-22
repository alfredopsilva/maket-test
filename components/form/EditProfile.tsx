"use client";
import React, { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EditProfileSchema } from "@/lib/definitions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { UpdateUserResponse } from "@/types";
import { revalidatePath } from "next/cache";
interface EditProfileFormProps {
  user: string;
}

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const parsedUser = JSON.parse(user);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstName: parsedUser?.firstName || "",
      lastName: parsedUser?.lastName || "",
      email: parsedUser?.email || "",
      password: "",
      repeatPassword: "",
      bio: parsedUser?.bio || "",
    },
  });

  async function onSubmit(data: z.infer<typeof EditProfileSchema>) {
    const formData = new FormData();
    for (const key in data) {
      if (
        key === "profileImage" &&
        data.profileImage instanceof FileList &&
        data.profileImage[0]
      ) {
        formData.append(key, data.profileImage[0]);
      } else {
        // NOTE: Check how to properly check this types for TS Compiler.
        formData.append(key, data[key] as string);
      }
    }

    const response: UpdateUserResponse = await updateUser(
      parsedUser.id,
      formData,
    );

    if (response.redirectUrl) {
      setMessage(
        `${response.message}. You will be redirected to your profile in 3 seconds.`,
      );
      setTimeout(() => {
        // NOTE: Try to find a better way to redirect.
        // BUG: Is removing isLogedIn context.
        window.location.href = response.redirectUrl as string;
      }, 3000);
    } else if (response.message) {
      setMessage(response.message);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle data-cy="edit-title" className="text-2xl">
          Edit Your Profile
        </CardTitle>
        <CardDescription data-cy="edit-description">
          Now you can edit your profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          data-cy="edit-form"
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
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-sm text-red-700" data-cy="first-name-error">
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
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-sm text-red-700" data-cy="last-name-error">
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
              {...register("email")}
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
              {...register("password")}
              data-cy="password-input"
            />
            {errors.password && (
              <p className="text-sm text-red-700" data-cy="password-error">
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
              {...register("repeatPassword")}
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
              Profile Image
            </Label>
            <Input
              data-cy="profile-avatar-input"
              id="profile-image"
              type="file"
              accept="image/*"
              className="file-input text-white"
              {...register("profileImage")}
            />
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
              {...register("bio")}
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
            data-cy="submit-edit-btn"
          >
            Submit
          </Button>
          {message && (
            <p className="text-sm text-red-700" data-cy="returned-message">
              {message}
            </p>
          )}
        </form>
        <div className="mt-4 text-center text-sm" data-cy="return-to-profile">
          Change of Plans? Return to your
          <Link
            href={`/profile/${parsedUser.id}`}
            className="underline ms-1"
            data-cy="return-to-profile-btn"
          >
            Profile
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditProfileForm;
