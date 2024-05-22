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

export interface LoginParams {
  email: string;
  password: string;
}

export interface ErrorResponse {
  errors: {
    [key: string]: string[];
  };
}

export interface SuccessResponse {
  redirectUrl: string;
}

export type LoginResponse = ErrorResponse | SuccessResponse;

export interface UserParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
  bio?: string;
  profileImage?: FileList;
}

export interface UpdateUserResponse {
  redirectUrl?: string;
  message?: string;
  errors?: {
    password?: string[];
    repeatPassword?: string[];
  };
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    profilePhoto?: string;
  };
}

export type CustomCypressContext = {
  userId: string;
};
