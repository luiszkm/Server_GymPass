import { makeCreateGymService } from '@/services/factories/make-create-gym-service'
import { makeFetchNearbyGymsService } from '@/services/factories/make-fecth-nearby-gyms-service'
import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function gymsNearbyController(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })
  const { latitude,longitude } = nearbyGymsQuerySchema.parse(request.query)
  const fetchnearbyGymsService = makeFetchNearbyGymsService()

  const { gyms } = await fetchnearbyGymsService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })
  return reply.status(200).send({
    gyms
  })
}