import dayjs from "dayjs";
import { ICheckInsRepository } from "../repositories/check-ins-repository";
import { ResourceNotFoundErro } from "./erros/resource-not-found-error";
import { LateCheckInValidationError } from "./erros/late-check-in-validation-error";
import { CheckIn } from "@prisma/client";

interface IValidateCheckInServiceRequest {
  checkInId: string
}

interface IValidateCheckInServiceResponse {
  checkIn: CheckIn
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