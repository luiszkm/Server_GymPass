import { expect, it, describe } from 'vitest'
import { RegisterService } from './registerService'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/inMemory/in-memory-users-repository'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'


describe('Register Services', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      name: 'test user',
      email: 'user.test@email.com',
      password: '123456'
    })

   await expect(user.id).toEqual(expect.any(String))

  })
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      name: 'test hash password',
      email: 'password.test@email.com',
      password: '123456'
    })
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)

  })
  it('Should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const email = 'twice.test@email.com'

    await registerService.execute({
      name: 'test email twice',
      email,
      password: '123456'
    })

    expect(() =>
      registerService.execute({
        name: 'test email twice',
        email,
        password: '123456'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})