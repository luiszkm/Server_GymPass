import { hash } from "bcryptjs";
import { IUserRepository } from "../repositories/users-repository";
interface IRegisterService {
  name: string
  email: string
  password: string
}
export class RegisterService {
  constructor(private usersRepository: IUserRepository) { }

  async execute({ name, email, password }: IRegisterService) {

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) throw new Error("Email already exist")
    const password_hash = await hash(password, 6)

    this.usersRepository.create({ name, email, password_hash })
  }
}


