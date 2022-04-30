import { getCustomRepository } from 'typeorm';
import { Request, Response, NextFunction } from "express"
import { UsersRepositories } from '../repositories/UseRepositories';

export async function ensureAdmin(request:Request, response: Response, next: NextFunction){
    const { user_id } = request

    const userRepositories = getCustomRepository(UsersRepositories)

    const { admin } = await userRepositories.findOne(user_id)

    //verificar se o usuário é admin

    if(admin){
        return next()
    }

    return response.status(401).json({error: "Unauthorized"});
}