import { makeCreateGymService } from '@/services/factories/make-create-gym-service'
import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function searchGymController(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })
  const { query, page } = searchGymsQuerySchema.parse(request.query)
  const searchGymService = makeSearchGymsService()

  const { gyms } = await searchGymService.execute({
    page,
    query
  })
  return reply.status(200).send({
    gyms
  })
}