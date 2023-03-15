import { hash } from "bcryptjs";
import { IUserRepository } from "../repositories/users-repository";
import { UserAlreadyExistsError } from "./erros/user-already-exists-error";
interface IRegisterService {
  name: string
  email: string
  password: string
}
export class RegisterService {
  constructor(private usersRepository: IUserRepository) { }

  async execute({ name, email, password }: IRegisterService) {

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) throw new UserAlreadyExistsError()
    const password_hash = await hash(password, 6)

    this.usersRepository.create({ name, email, password_hash })
  }
}


