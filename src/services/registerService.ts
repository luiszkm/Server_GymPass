import { hash } from "bcryptjs";
import { IUserRepository } from "../repositories/users-repository";
import { UserAlreadyExistsError } from "./erros/user-already-exists-error";
import { UserModel } from "../models/userModel";
interface IRegisterService {
  name: string
  email: string
  password: string
}

interface IRegisterServiceResponse {
  user: UserModel
}

export class RegisterService {
  constructor(private usersRepository: IUserRepository) { }

  async execute({ name, email, password }: IRegisterService): Promise<IRegisterServiceResponse> {

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) throw new UserAlreadyExistsError()
    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    })

    return { user }
  }
}


