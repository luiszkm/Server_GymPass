import { expect, it, describe, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/inMemory/in-memory-gyms-repository'
import { SearchGymsService } from '@/services/searchGymsService'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Search Gyms service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(gymsRepository)
  })

  it('should not be able to search for gyms ', async () => {
    await gymsRepository.create({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -19.8577546,
      longitude :  -44.1533469
    })
    await gymsRepository.create({
      title: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: -19.8577546,
      longitude :  -44.1533469
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page:1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym' }),
    ])
  })

  it('should not be able to fetch paginated gyms search', async () => {
    
    for (let i =1 ; i <= 22; i++){
      await gymsRepository.create({
        title: `JavaScript Gym-${i}`,
        description: null,
        phone: null,
        latitude: -19.8577546,
        longitude :  -44.1533469
      })
    }
    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym-21' }),
      expect.objectContaining({ title: 'JavaScript Gym-22' }),
    ])
  })
})