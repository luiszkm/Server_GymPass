import { expect, it, describe, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/inMemory/in-memory-users-repository'
import { RegisterService } from '@/services/registerService'
import { UserAlreadyExistsError } from '@/services/erros/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register Services', () => {
  beforeEach(()=>{
     usersRepository = new InMemoryUsersRepository()
     sut = new RegisterService(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'test user',
      email: 'user.test@email.com',
      password: '123456'
    })
   await expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
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
    const email = 'twice.test@email.com'
    await sut.execute({
      name: 'test email twice',
      email,
      password: '123456'
    })
   await expect(() =>
      sut.execute({
        name: 'test email twice',
        email,
        password: '123456'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})