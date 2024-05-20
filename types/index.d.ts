export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  profileImage: string | null;
  bio: string | null;
  isAdmin: boolean;
}
