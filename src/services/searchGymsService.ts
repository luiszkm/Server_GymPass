import { IGymsRepository } from "../repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface ISearchGymsServiceRequest {
  query: string
  page: number
}

interface ICreateGymResponse {
  gyms: Gym[]
}

export class SearchGymsService {
  constructor(private gymsRepository: IGymsRepository) { }

  async execute( { query, page}: ISearchGymsServiceRequest):
   Promise<ICreateGymResponse> {

    const gyms = await this.gymsRepository.searchMany(query, page);
    return { gyms }
  }
}


