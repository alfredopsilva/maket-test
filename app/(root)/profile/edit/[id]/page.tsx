import EditProfileForm from "@/components/form/EditProfile";
import { getUserById } from "@/lib/actions/user.actions";

const EditProfile = async ({ params }: { params: { id: string } }) => {
  const user = await getUserById(params.id);
  if (!user) return;

  return <EditProfileForm user={JSON.stringify(user)} />;
};

export default EditProfile;
