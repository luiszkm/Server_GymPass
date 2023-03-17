import { Decimal } from "@prisma/client/runtime";

export interface GymModel  {
  id: string;
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number | Decimal;
  longitude: number | Decimal;
}