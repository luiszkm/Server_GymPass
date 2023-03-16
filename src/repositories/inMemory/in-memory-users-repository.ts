import { User, Prisma } from "@prisma/client";
import { IUserRepository } from "../users-repository";
import { randomUUID } from "node:crypto";



export class InMemoryUsersRepository implements IUserRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find(item => item.id === id)
    if (!user) return null
    return user
  }
  async findByEmail(email: string) {
    const user = this.items.find(item => item.email === email)
    if (!user) return null
    return user
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    }
    this.items.push(user)
    return user
  }
}

