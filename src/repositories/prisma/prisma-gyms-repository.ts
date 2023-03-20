import { Gym, Prisma } from "@prisma/client";
import { IFindMayNearByParams, IGymsRepository } from "../gyms-repository";
import { prisma } from "../../lib/prisma";

export class PrismaGymsRepository implements IGymsRepository {

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id
      }
    })
    return gym
  }
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data
    })
    return gym
  }
  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query
        },
      }, take: 20,
      skip: (page - 1) * 20 // number of dates for pages
    })
    return gyms
  }
  async findManyNearBy({ latitude, longitude }: IFindMayNearByParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10 
    `
    return gyms
  }

}