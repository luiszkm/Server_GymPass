import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance , isAdmin = false) {
  const user = await prisma.user.create({
    data: {
      name: 'userPrpfile test',
      email: 'profile@example.com',
      password_hash: await hash('123456', 6),
      role : isAdmin? 'ADMIN' : 'MEMBER'
    }
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
