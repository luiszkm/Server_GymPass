import { makeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function historyCheckInsController(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })
  const {page } = searchGymsQuerySchema.parse(request.query)
  const fetchUserCheckInsService = makeFetchUserCheckInsHistoryService()
  
  const { checkIns } = await fetchUserCheckInsService.execute({
    userId: request.user.sub,
    page
  })
  return reply.status(200).send({
    checkIns
  })
}