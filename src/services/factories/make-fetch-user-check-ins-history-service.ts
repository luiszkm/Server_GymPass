import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository"
import { FetchUserCheckInsHistoryService } from "../fetchUserCheckInsHistoryService"

export function makeFetchUserCheckInsHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new FetchUserCheckInsHistoryService(checkInsRepository)

  return service
}