import { Gym } from '@prisma/client'
import { Prisma } from '@prisma/client'

export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: String, page: number): Promise<Gym[]>
}