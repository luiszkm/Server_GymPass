import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/inMemory/in-memory-users-repository'
import { GetUserProfileService } from '@/services/getUserProfileService'
import { ResourceNotFoundErro } from '@/services/erros/resource-not-found-error'



let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get user Profile service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(usersRepository)
  })

  it('should be able to get user profile by Id', async () => {
    const createdUser = await usersRepository.create({
      name: 'teste',
      email: 'user.test@email.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })

     expect(user.id).toEqual(expect.any(String))
     expect(user.name).toEqual('teste')
  })

  it('should not be able to get user profile with wrong id ', async () => {
    await expect(() => sut.execute({
      userId: 'non-existing-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundErro)
  })

})