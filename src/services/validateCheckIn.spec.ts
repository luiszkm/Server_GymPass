import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/inMemory/in-memory-checkins-repository'
import { InMemoryGymsRepository } from '../repositories/inMemory/in-memory-gyms-repository'
import { ValidateCheckInService } from './validateCheckInService'
import { ResourceNotFoundErro } from './erros/resource-not-found-error'
import { LateCheckInValidationError } from './erros/late-check-in-validation-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: ValidateCheckInService

describe('Validate Check-in service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new ValidateCheckInService(checkInsRepository)
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should not be able to validated the check-in ', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })
    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })
    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validated an inexistent check-in ', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in - id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundErro)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })
    const twentyOneMinutesInMs = 1000 * 60 * 21 //21 minutes
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id
      })).rejects.toBeInstanceOf(LateCheckInValidationError)


  })
})
