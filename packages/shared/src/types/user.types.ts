export type UserRole = 'photographer' | 'client' | 'guest' | 'admin';

export interface User {
  uid: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  createdAt: number;
  updatedAt: number;
}
