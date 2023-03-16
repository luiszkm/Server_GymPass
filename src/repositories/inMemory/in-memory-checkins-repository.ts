import { Prisma, CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {

    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find(
      (checkIn) => {
        const checkInDate = dayjs(checkIn.created_at)
        const isOnSameDate =
          checkInDate.isAfter(startOfTheDay) &&
          checkInDate.isBefore(endOfTheDay)

        return checkIn.user_id === userId && isOnSameDate
      })
    if (!checkInOnSameDate) return null

    return checkInOnSameDate

  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
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

