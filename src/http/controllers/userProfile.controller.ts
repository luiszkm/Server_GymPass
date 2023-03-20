import { FastifyReply, FastifyRequest } from 'fastify'


export async function UserProfileController(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()
  

  return reply.status(200).send()
}