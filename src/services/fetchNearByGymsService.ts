
import { IGymsRepository } from "../repositories/gyms-repository";
import { GymModel } from "../models/gymModel";
import { Gym } from "@prisma/client";

interface IFetchNearByGymsServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface ICreateGymResponse {
  gyms: GymModel[]
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


