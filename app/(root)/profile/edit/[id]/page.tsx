import ProfileForm from "@/components/form/ProfileForm";
import { getUserById } from "@/lib/actions/user.actions";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
const EditProfile = async ({ params }: { params: { id: string } }) => {
  const user = await getUserById(params.id);
  if (!user) return;

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
        <ProfileForm user={JSON.stringify(user)} />
        <div className="mt-4 text-center text-sm" data-cy="return-to-profile">
          Change of Plans? Return to your
          <Link
            href={`/profile/${user.id}`}
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

export default EditProfile;
