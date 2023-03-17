import { IGymsRepository } from "../repositories/gyms-repository";
import { GymModel } from "../models/gymModel";
interface ICreateGymServiceRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface ICreateGymResponse {
  gym: GymModel
}

export class CreateGymService {
  constructor(private gymsRepository: IGymsRepository) { }

  async execute(
    { title,
      description,
      phone,
      latitude,
      longitude
    }: ICreateGymServiceRequest): Promise<ICreateGymResponse> {

    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    })

    return { gym }
  }
}


