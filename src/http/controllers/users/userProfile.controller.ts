import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function UserProfileController(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()
  const getUserProfile = makeGetUserProfileService()

  const {user}= await getUserProfile.execute({
    userId: request.user.sub
  })

  return reply.status(200).send({
    ...user,
    password_hash: undefined,
  })
}