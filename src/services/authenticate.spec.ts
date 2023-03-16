import { expect, it, describe, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/inMemory/in-memory-users-repository'
import { AuthenticateService } from './authenticateService'
import { InvalidCredentialsErro } from './erros/invalid-credentials-error'


let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate Services', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should be able to Authenticate', async () => {
    await usersRepository.create({
      name: 'teste',
      email: 'user.test@email.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'user.test@email.com',
      password: '123456'
    })

    await expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to Authenticate with wrong email', async () => {
    await expect(() => sut.execute({
      email: 'nonexistent.test@email.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsErro)
  })

  it('should not be able to Authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'teste',
      email: 'user.test@email.com',
      password_hash: await hash('123456', 6)
    })

    await expect(() => sut.execute({
      email: 'user.test@email.com',
      password: '12345678',
    })).rejects.toBeInstanceOf(InvalidCredentialsErro)
  })
})