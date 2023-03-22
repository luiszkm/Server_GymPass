import { makeGetUserMetricsService } from '@/services/factories/make-user-metrics-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metricsCheckInsController(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetrics = makeGetUserMetricsService()
  
  const { checkInsCount } = await getUserMetrics.execute({
    userId: request.user.sub,
  })
  return reply.status(200).send({
    checkInsCount
  })
}