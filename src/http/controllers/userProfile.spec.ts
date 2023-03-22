import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../app";

describe('UserProfile Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it.only('should be able to user profile', async () => {
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
    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()
      console.log(response);
      
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        email: 'profile@example.com',
      }),
    )
  })
})