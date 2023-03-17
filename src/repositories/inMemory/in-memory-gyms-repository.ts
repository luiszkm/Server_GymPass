
import { Gym } from "@prisma/client";
import { IGymsRepository } from "../gyms-repository";



export class InMemoryGymsRepository implements IGymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find(item => item.id === id)

    if (!gym) return null
    
    return gym
  }

}

