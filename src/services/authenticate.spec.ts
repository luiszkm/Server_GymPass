import { expect, it, describe } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/inMemory/in-memory-users-repository'
import { AuthenticateService } from './authenticateService'
import { InvalidCredentialsErro } from './erros/invalid-credentials-error'


describe('Authenticate Services', () => {
  it('should be able to Authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateService = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: 'teste',
      email: 'user.test@email.com',
      password_hash: await hash('123456', 6)
    })


    const { user } = await authenticateService.execute({
      email: 'user.test@email.com',
      password: '123456'
    })

    await expect(user.id).toEqual(expect.any(String))

  })

  it('should not be able to Authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateService = new AuthenticateService(usersRepository)
    await expect(()=> authenticateService.execute({
      email: 'nonexistent.test@email.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsErro)
  })

  it('should not be able to Authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateService = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: 'teste',
      email: 'user.test@email.com',
      password_hash: await hash('123456', 6)
    })

    await expect(()=> authenticateService.execute({
      email:  'user.test@email.com',
      password: '12345678',
    })).rejects.toBeInstanceOf(InvalidCredentialsErro)
  })
})