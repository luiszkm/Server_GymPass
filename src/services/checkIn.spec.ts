import { expect, it, describe, beforeEach } from 'vitest'
import { ResourceNotFoundErro } from './erros/resource-not-found-error'
import { InMemoryCheckInsRepository } from '../repositories/inMemory/in-memory-checkins-repository'
import { CheckInService } from './checkinService'


let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('Check-in service', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkInRepository)
  })

  it('should not be able to check in ', async () => {
    const { checkIn } = await sut.execute({
      gymId: '',
      userId: '',
    })
    await expect(checkIn.id).toEqual(expect.any(String))
  })
})