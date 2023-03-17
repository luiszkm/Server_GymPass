import { CheckInModel } from "../models/checkInModel";
import { ICheckInsRepository } from "../repositories/check-ins-repository";
import { IGymsRepository } from "../repositories/gyms-repository";
import { getDistanceBetweenCoordinates } from "../utils/get-distance-between-coordinate";
import { MaxDistanceErro } from "./erros/max-distance-error";
import { MaxNumberOfCheckInsError } from "./erros/max-number-of-chec-ins-error";
import { ResourceNotFoundErro } from "./erros/resource-not-found-error";

interface ICheckInServiceRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface ICheckInServiceResponse {
  checkIn: CheckInModel
}

export class CheckInService {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository
  ) { }

  async execute(
    { userId,
      gymId,
      userLongitude,
      userLatitude
    }: ICheckInServiceRequest): Promise<ICheckInServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) throw new ResourceNotFoundErro()

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber()
      }
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1 // 100 meters
    if (distance > MAX_DISTANCE_IN_KILOMETERS) throw new MaxDistanceErro()

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDay) throw new MaxNumberOfCheckInsError()

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    })
    return {
      checkIn
    }
  }
}