'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginFormSchema } from '@/lib/definitions';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { login } from '@/lib/actions/auth.actions';
import { useRouter } from 'next/navigation';
import { LoginResponse, ErrorResponse, SuccessResponse } from '@/types';
import { useAuth } from '@/context/AuthProvider';
// Type Guards to properly handle the response from the login function. If the response is an ErrorResponse, we set the errors on the form. If the response is a SuccessResponse, we redirect the user to the profile page.
function isErrorResponse(response: LoginResponse): response is ErrorResponse {
    return (response as ErrorResponse).errors !== undefined;
}

function isSuccessResponse(
    response: LoginResponse
): response is SuccessResponse {
    return (response as SuccessResponse).redirectUrl !== undefined;
}

export function LoginForm() {
    const router = useRouter();
    const { setIsLoggedIn } = useAuth();

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {},
    });

    async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
        try {
            const response = await login(data);

            if (isErrorResponse(response)) {
                Object.keys(response.errors).forEach(key => {
                    form.setError(
                        key as keyof z.infer<typeof LoginFormSchema>,
                        {
                            type: 'manual',
                            message: response.errors[key][0],
                        }
                    );
                });
            } else if (isSuccessResponse(response)) {
                setIsLoggedIn(true);
                router.push(response.redirectUrl);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    return (
        <section className="">
            <Card className="mx-auto max-w-sm" data-cy="login-container">
                <CardHeader>
                    <CardTitle data-cy="card-title" className="text-2xl">
                        Login
                    </CardTitle>
                    <CardDescription data-cy="card-description">
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        className="grid gap-4"
                        data-cy="login-form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="grid gap-2">
                            <Label htmlFor="email" data-cy="email-label">
                                Email
                            </Label>
                            <Input
                                {...register('email')}
                                id="email"
                                data-cy="email-input"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        {errors.email && (
                            <p
                                data-cy="email-error"
                                className="text-sm text-red-700"
                            >
                                {errors.email.message}
                            </p>
                        )}
                        <div className="grid gap-2">
                            <div
                                className="flex items-center"
                                data-cy="password-container"
                            >
                                <Label
                                    htmlFor="password"
                                    data-cy="password-label"
                                >
                                    Password
                                </Label>
                                <Link
                                    href="#"
                                    className="ml-auto inline-block text-sm underline"
                                    data-cy="forgot-password-link"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                {...register('password')}
                                data-cy="password-input"
                                type="password"
                                required
                            />
                        </div>
                        {errors.password && (
                            <p
                                data-cy="password-error"
                                className="text-sm text-red-700"
                            >
                                {errors.password.message}
                            </p>
                        )}
                        <Button
                            data-cy="submit-login-btn"
                            type="submit"
                            className="w-full dark:bg-accentColor"
                        >
                            Login
                        </Button>
                    </form>
                    <div
                        className="mt-4 text-center text-sm"
                        data-cy="create-account"
                    >
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/signup"
                            className="underline"
                            data-cy="sign-up-link"
                        >
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}

export default LoginForm;
