import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileForm from "@/components/form/ProfileForm";

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
        <ProfileForm />
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
