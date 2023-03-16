import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { AuthenticateService } from "../authenticateService"

export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(usersRepository)

  return authenticateService
}