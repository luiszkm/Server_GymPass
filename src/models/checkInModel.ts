export interface CheckInModel {
  id: string;
  created_at: Date;
  validated_at: Date | null;
  user_id: string;
  gym_id: string;
}