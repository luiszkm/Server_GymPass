import { makeCheckInService } from '@/services/factories/make-check-in-sevice'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createCheckInsController(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid()
  })
  const createCheckInBodySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude,longitude } = createCheckInBodySchema.parse(request.body)
    const createCheckInService = makeCheckInService()

    await createCheckInService.execute({
      gymId,
      userId: request.user.sub,
      userLatitude: latitude,
      userLongitude: longitude
    })
    return reply.status(201).send()
}