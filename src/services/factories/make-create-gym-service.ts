import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository"
import { CreateGymService } from "../createGymService"

export function makeCreateGymService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new CreateGymService(gymsRepository)

  return service
}