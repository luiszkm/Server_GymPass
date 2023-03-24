import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import { Decimal } from '@prisma/client/runtime'
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/in-memory-checkins-repository'
import { InMemoryGymsRepository } from '@/repositories/inMemory/in-memory-gyms-repository'
import { CheckInService } from '@/services/checkInService'
import { MaxNumberOfCheckInsError } from '@/services/erros/max-number-of-chec-ins-error'
import { MaxDistanceErro } from '@/services/erros/max-distance-error'



let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check-in service', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInRepository, gymsRepository)


    await gymsRepository.create({
      id: 'gym-01',
      title: 'JS Academy',
      description: "",
      phone: "",
      latitude: -19.8577546,
      longitude: -44.1533469,
    })

    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should not be able to check in ', async () => {

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.8577546,
      userLongitude: -44.1533469
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day ', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 9, 0, 0,))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.8577546,
      userLongitude: -44.1533469
    })
    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -19.8577546,
        userLongitude: -44.1533469
      })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should  be able to check in twice but in the different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 9, 0, 0,))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.8577546,
      userLongitude: -44.1533469
    })
    vi.setSystemTime(new Date(2023, 0, 21, 9, 0, 0,))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.8577546,
      userLongitude: -44.1533469
    })
    expect(checkIn.id).toEqual(expect.any(String))

  })


  it('should not be able to check in on distant gym', async () => {

    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JS Academy',
      description: "",
      phone: "",
      latitude: new Decimal(-19.8592598),
      longitude: new Decimal(-44.1325551),
    })


    await expect(() => sut.execute({
      gymId: 'gym-02',
      userId: 'user-01',
      userLatitude: -19.8577546,
      userLongitude: -44.1533469
    })).rejects.toBeInstanceOf(MaxDistanceErro)
  })
})
