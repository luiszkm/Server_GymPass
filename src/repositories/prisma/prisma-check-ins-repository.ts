import { Prisma, CheckIn } from '@prisma/client';
import { ICheckInsRepository } from '../check-ins-repository'
import { prisma } from '../../lib/prisma';
import dayjs from 'dayjs';



export class PrismaCheckInsRepository implements ICheckInsRepository {

  async findById(id: string) {
    const checkIns = await prisma.checkIn.findUnique({
      where: { id }
    })
    return checkIns
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    })
    return checkIn
  }
  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20 // number of dates for pages
    })
    return checkIns
  }
  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    })
    return count
  }
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data
    })
    return checkIn
  }
  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id
      },
      data: data
    })
    return checkIn
  }
}