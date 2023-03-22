import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server)
    .post('/users')
    .send({
      name: 'userPrpfile test',
      email: 'profile@example.com',
      password: '123456'
    })

  const autheResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: 'profile@example.com',
      password: '123456'
    })
  const { token } = autheResponse.body
  return {
    token,
  }
}