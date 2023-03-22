import dayjs from "dayjs";
import { CheckInModel } from "../models/checkInModel";
import { ICheckInsRepository } from "../repositories/check-ins-repository";
import { ResourceNotFoundErro } from "./erros/resource-not-found-error";
import { LateCheckInValidationError } from "./erros/late-check-in-validation-error";

interface IValidateCheckInServiceRequest {
  checkInId: string
}

interface IValidateCheckInServiceResponse {
  checkIn: CheckInModel
}

export class ValidateCheckInService {
  constructor(private checkInsRepository: ICheckInsRepository) { }

  async execute({ checkInId }
    : IValidateCheckInServiceRequest): Promise<IValidateCheckInServiceResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) throw new ResourceNotFoundErro()
    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minute',
    )
    if (distanceInMinutesFromCheckInCreation > 20) throw new LateCheckInValidationError()

      checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return { checkIn }

  }
}