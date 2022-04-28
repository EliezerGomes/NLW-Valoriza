import { getCustomRepository } from 'typeorm';
import { compare } from "bcryptjs"
import { UsersRepositories } from '../repositories/UseRepositories';
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest{
    email: string
    password: string
}

class AutheticateUserService{
    async execute({email, password} : IAuthenticateRequest){
        const userRepositories = getCustomRepository(UsersRepositories)
        //Verifivar se o email existe
        const user = userRepositories.findOne({email})

        if(!user){
            throw new Error("Email/Password incorrect!!")
        }
        //Verificar se senha está correta
        const passwordMatch = compare(password, (await user).password)

        if(!passwordMatch){
            throw new Error("Email/Password incorrect!!")   
        }

        //Gerar Token
        const token = sign({
            email: (await user).email
        }, 
        "e840165e1cd199243a450a614e97e112",
         {
            subject: (await user).id,
            expiresIn: "1d"
        })

        return token
    }
}

export { AutheticateUserService }