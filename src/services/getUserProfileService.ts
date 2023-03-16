import { compare } from "bcryptjs";
import { IUserRepository } from "../repositories/users-repository";
import { InvalidCredentialsErro } from "./erros/invalid-credentials-error";
import { UserModel } from "../models/userModel";
import { ResourceNotFoundErro } from "./erros/resource-not-found-error";

interface IGetUserProfileServiceRequest {
  userId: string

}

interface IGetUserProfileServiceResponse {
  user:UserModel
}


export class GetUserProfileService {
  constructor(
    private usersRepository: IUserRepository
  ) { }

  async execute({userId}: IGetUserProfileServiceRequest): Promise <IGetUserProfileServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if(!user) throw new ResourceNotFoundErro()
    
    return{
      user
    }
  }
}