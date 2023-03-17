
import { expect, it, describe, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '../repositories/inMemory/in-memory-gyms-repository'
import { FetchNearByGymsService } from './fetchNearByGymsService'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearByGymsService

describe('Fetch nearby Gyms service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymsService(gymsRepository)
  })

  it('should not be able to fetch nearby gyms ', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -19.8577546,
      longitude :  -44.1533469
    })
    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -19.9426902,
      longitude :  -44.0187189
    })

    const { gyms } = await sut.execute({
      userLatitude: -19.8577546,
      userLongitude: -44.1533469
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym' }),
    ])
  })

})