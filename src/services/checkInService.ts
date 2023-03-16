import { CheckInModel } from "../models/checkInModel";
import { ICheckInsRepository } from "../repositories/check-ins-repository";

interface ICheckInServiceRequest {
  userId: string
  gymId: string

}

interface ICheckInServiceResponse {
  checkIn: CheckInModel
}

export class CheckInService {
  constructor(
    private checkInsRepository: ICheckInsRepository
  ) { }

  async execute({userId, gymId}: ICheckInServiceRequest): Promise <ICheckInServiceResponse> {
 
    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())
    
    if(checkInOnSameDate) throw new Error()

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    })
    return{
      checkIn
    }
  }
}