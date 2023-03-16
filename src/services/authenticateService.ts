import { compare } from "bcryptjs";
import { IUserRepository } from "../repositories/users-repository";
import { InvalidCredentialsErro } from "./erros/invalid-credentials-error";
import { UserModel } from "../models/userModel";

interface IAuthenticateServiceRequest {
  email: string
  password: string

}

interface IAuthenticateServiceResponse {
  user:UserModel
}


export class AuthenticateService {
  constructor(
    private usersRepository: IUserRepository
  ) { }

  async execute({ email, password }: IAuthenticateServiceRequest): Promise <IAuthenticateServiceResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if(!user) throw new InvalidCredentialsErro()

    const doesPasswordMatches = await compare(password, user.password_hash)
    if(!doesPasswordMatches) throw new InvalidCredentialsErro()

    return{
      user
    }
  }
}