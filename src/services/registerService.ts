import { prisma } from "../lib/prisma";
import { hash } from "bcryptjs";

interface IRegisterService {
  name: string
  email : string
  password: string
}

export async function registerService ({name,email,password}: IRegisterService){

  const userWithSameEmail = await prisma.user.findUnique({
    where:{
      email
    }
  })
  
  if(userWithSameEmail) throw new Error("Email already exist")
  
  const password_hash = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash
    }
  })
}