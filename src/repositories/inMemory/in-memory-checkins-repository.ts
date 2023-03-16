import { Prisma, CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";



export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_At: data.validated_At ? new Date(data.validated_At) : null,
      created_at: new Date()
    }
    this.items.push(checkIn)

    return checkIn
  }
}

