import React from "react";
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

const Page = () => {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl" data-cy="sign-up-title">
          Sign Up
        </CardTitle>
        <CardDescription data-cy="sign-up-description">
          Enter your your data below to create an Account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" data-cy="sign-up-form">
          <div className="grid gap-4 grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="first-name" data-cy="first-name-label">
                First Name
              </Label>
              <Input
                id="first-name"
                type="text"
                placeholder="John"
                required
                data-cy="first-name-input"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name" data-cy="last-name-label">
                Last Name
              </Label>
              <Input
                id="last-name"
                type="text"
                placeholder="Doe"
                required
                data-cy="last-name-input"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" data-cy="email-label">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              data-cy="email-input"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" data-cy="password-label">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              data-cy="password-input"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="repeatPassword" data-cy="repeat-password-label">
              Repeat Password
            </Label>
            <Input
              id="repeatPassword"
              type="password"
              required
              data-cy="repeat-password-input"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="profile-photo" data-cy="profile-avatar-label">
              Profile Photo
            </Label>
            <Input
              id="profile-photo"
              type="file"
              accept="image/*"
              className="file-input text-white"
              data-cy="profile-avatar-input"
            />
          </div>
          <Button
            type="submit"
            className="w-full dark:bg-accentColor"
            data-cy="submit-sign-up-btn"
          >
            Sign Up
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an Account?{" "}
          <Link href="/login" className="underline" data-cy="login-link">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
