import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
describe('Authenticate Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'register test',
        email: 'test@example.com',
        password: '123456'
      })
    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'test@example.com',
        password: '123456'
      })
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})