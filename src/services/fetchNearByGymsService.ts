
import { IGymsRepository } from "../repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface IFetchNearByGymsServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface ICreateGymResponse {
  gyms: Gym[]
}

export class FetchNearByGymsService {
  constructor(private gymsRepository: IGymsRepository) { }

  async execute({ userLatitude, userLongitude }: IFetchNearByGymsServiceRequest):
    Promise<ICreateGymResponse> {

    const gyms = await this.gymsRepository.findManyNearBy(
      {
        latitude: userLatitude,
        longitude: userLongitude
      }
    )
    return { gyms }
  }
}


