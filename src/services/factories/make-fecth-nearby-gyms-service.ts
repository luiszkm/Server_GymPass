import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository"
import { FetchNearByGymsService } from "../fetchNearByGymsService"

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new FetchNearByGymsService(gymsRepository)

  return service
}