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
import { LoginResponse, ErrorResponse, SuccessResponse } from "@/types";

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
    const response = await updateUser(parsedUser.id, data);
    if (response?.redirectUrl) {
      router.push(response.redirectUrl);
    } else if (response?.message) {
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
        <CardTitle className="text-2xl">Edit Your Profile </CardTitle>
        <CardDescription>Now You can Edit your Profile.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                type="text"
                placeholder="John"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-sm text-red-700">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                type="text"
                placeholder="Doe"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-sm text-red-700">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-700">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-red-700">{errors.password.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="repeatPassword">Repeat Password</Label>
            <Input
              id="repeatPassword"
              type="password"
              {...register("repeatPassword")}
            />
            {errors.repeatPassword && (
              <p className="text-sm text-red-700">
                {errors.repeatPassword.message}
              </p>
            )}
          </div>
          {/* <div className="grid gap-2"> */}
          {/*   <Label htmlFor="profile-photo">Profile Photo</Label> */}
          {/*   <Input */}
          {/*     id="profile-photo" */}
          {/*     type="file" */}
          {/*     accept="image/*" */}
          {/*     className="file-input text-white" */}
          {/*     {...register("profilePhoto")} */}
          {/*   /> */}
          {/*   {errors.profilePhoto && ( */}
          {/*     <p className="text-sm text-red-700"> */}
          {/*       {errors.profilePhoto.message} */}
          {/*     </p> */}
          {/*   )} */}
          {/* </div> */}
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Write something about yourself"
              className="min-h-40"
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-sm text-red-700">{errors.bio.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full dark:bg-accentColor">
            Submit
          </Button>
          {message && <p className="text-sm text-red-700">{message}</p>}
        </form>
        <div className="mt-4 text-center text-sm">
          Change of Plans? Return to your
          <Link href={`/profile/${parsedUser.id}`} className="underline ms-1">
            Profile
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditProfileForm;
