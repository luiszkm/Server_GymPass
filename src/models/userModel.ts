export interface UserModel {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
}