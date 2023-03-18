
import { Gym, Prisma } from "@prisma/client";
import { IFindMayNearByParams, IGymsRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "../../utils/get-distance-between-coordinate";

export class InMemoryGymsRepository implements IGymsRepository {
  async findManyNearBy(params: IFindMayNearByParams) {
    return this.items.filter(item => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber()
        }
      )
      return distance < 10
    })
  }

  async searchMany(query: string, page: number) {
    const initialPage = (page - 1) * 20
    const finallyPage = page * 20
    return this.items.filter(item => item.title.includes(query))
      .slice(initialPage, finallyPage)
  }
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find(item => item.id === id)

    if (!gym) return null

    return gym
  }
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date()
    }
    this.items.push(gym)
    return gym
  }
}

