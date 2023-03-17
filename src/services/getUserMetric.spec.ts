
import { expect, it, describe, beforeEach} from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/inMemory/in-memory-checkins-repository'
import { GetUserMetricsService } from './getUserMetricsService'

let checkInRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsService

describe('Get user Metrics service', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(checkInRepository)
  })

  it('should not be able to get check-9ns count from metrics', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })
    expect(checkInsCount).toEqual(2)
  })
})