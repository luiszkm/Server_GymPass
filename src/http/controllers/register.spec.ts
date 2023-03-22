import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../app";
describe('Register Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to registe', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'register test',
        email: 'test@example.com',
        password: '123456'
      })
    expect(response.statusCode).toEqual(201)
  })
})