import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository"
import { ValidateCheckInService } from "../validateCheckInService"

export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new ValidateCheckInService(checkInsRepository)

  return service
}