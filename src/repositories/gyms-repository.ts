import { Gym } from '@prisma/client'
import { Prisma } from '@prisma/client'

export interface IFindMayNearByParams {
  latitude: number
  longitude: number
}
export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearBy(params:IFindMayNearByParams): Promise<Gym[]>
}