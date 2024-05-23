import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { getUserById } from '@/lib/actions/user.actions';
import { useAuth } from '@/context/AuthProvider';

const Page = async ({ params }: { params: { id: string } }) => {
    const user = await getUserById(params.id);

    if (!user) return;

    return (
        <section className="flex flex-col items-center gap-5 max-w-lg">
            <div className="">
                <Avatar data-cy="avatar-container" className="w-24 h-24">
                    <AvatarImage
                        data-cy="user-avatar"
                        alt="User Profile Avatar"
                        src={
                            user?.profileImage
                                ? user.profileImage
                                : '/images/admin.webp'
                        }
                    />
                    <AvatarFallback data-cy="avatar-fallback">{`${user?.firstName[0]}${user?.lastName[0]}`}</AvatarFallback>
                </Avatar>
            </div>
            <div>
                <div className="flex gap-3 items-center">
                    <h3
                        className="text-3xl dark:text-accentColor"
                        data-cy="user-name"
                    >{`${user?.firstName} ${user?.lastName}`}</h3>
                    <Link
                        href={`/profile/edit/${user.id}`}
                        data-cy="edit-profile-btn"
                        aria-label="Edit Profile"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="Outline"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            className="fill-current text-gray-800 dark:text-accentColor cursor-pointer"
                        >
                            <path d="M18.656.93,6.464,13.122A4.966,4.966,0,0,0,5,16.657V18a1,1,0,0,0,1,1H7.343a4.966,4.966,0,0,0,3.535-1.464L23.07,5.344a3.125,3.125,0,0,0,0-4.414A3.194,3.194,0,0,0,18.656.93Zm3,3L9.464,16.122A3.02,3.02,0,0,1,7.343,17H7v-.343a3.02,3.02,0,0,1,.878-2.121L20.07,2.344a1.148,1.148,0,0,1,1.586,0A1.123,1.123,0,0,1,21.656,3.93Z" />
                            <path d="M23,8.979a1,1,0,0,0-1,1V15H18a3,3,0,0,0-3,3v4H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2h9.042a1,1,0,0,0,0-2H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16.343a4.968,4.968,0,0,0,3.536-1.464l2.656-2.658A4.968,4.968,0,0,0,24,16.343V9.979A1,1,0,0,0,23,8.979ZM18.465,21.122a2.975,2.975,0,0,1-1.465.8V18a1,1,0,0,1,1-1h3.925a3.016,3.016,0,0,1-.8,1.464Z" />
                        </svg>
                    </Link>
                </div>
                <p
                    className="text-sm text-center text-gray-500 dark:text-gray-400"
                    data-cy="user-role"
                >
                    {user?.isAdmin ? 'Admin' : 'User'}
                </p>
            </div>
            <div className="">
                <p
                    className="text-justify text-sm text-slate-600"
                    data-cy="user-bio"
                >
                    {user?.bio ? user?.bio : 'Update your bio!'}
                </p>
            </div>
        </section>
    );
};

export default Page;
