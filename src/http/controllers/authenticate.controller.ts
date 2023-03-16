import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsErro } from '../../services/erros/invalid-credentials-error'
import { makeAuthenticateService } from '../../services/factories/make-authenticate-service'

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateService =  makeAuthenticateService()

    await authenticateService.execute({ email, password })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof InvalidCredentialsErro) return reply.status(400).send({ message: error.message })
    throw error
  }
}