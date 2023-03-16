import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { AuthenticateService } from '../../services/authenticateService'
import { InvalidCredentialsErro } from '../../services/erros/invalid-credentials-error'

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticateService = new AuthenticateService(usersRepository)

    await authenticateService.execute({ email, password })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof InvalidCredentialsErro) return reply.status(400).send({ message: error.message })
    throw error
  }
}