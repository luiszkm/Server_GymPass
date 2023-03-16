import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/inMemory/in-memory-checkins-repository'
import { CheckInService } from './checkInService'


let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('Check-in service', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkInRepository)
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should not be able to check in ', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day ', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 9, 0, 0,))

    await sut.execute({
      gymId: 'gym-02',
      userId: 'user-02',
    })
    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-02',
      })).rejects.toBeInstanceOf(Error)
  })

  it('should  be able to check in twice but in the different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 9, 0, 0,))

    await sut.execute({
      gymId: 'gym-03',
      userId: 'user-03',
    })
    vi.setSystemTime(new Date(2023, 0, 21, 9, 0, 0,))

    const { checkIn } = await sut.execute({
      gymId: 'gym-03',
      userId: 'user-03',
    })
    expect(checkIn.id).toEqual(expect.any(String))

  })
})