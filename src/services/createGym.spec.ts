import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/inMemory/in-memory-gyms-repository'
import { CreateGymService } from './createGymService'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Register Services', () => {
  beforeEach(()=>{
    gymsRepository = new InMemoryGymsRepository()
     sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'test user',
      description: null,
      phone: null,
      latitude: -19.8577546,
      longitude :  -44.1533469
      
    })
   await expect(gym.id).toEqual(expect.any(String))
  })

})