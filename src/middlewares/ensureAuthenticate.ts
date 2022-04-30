import { Request, Response, NextFunction }  from "express"
import { verify } from "jsonwebtoken"

interface IPayload{
    sub: string
}

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction){
    //receber o token
    const authToken = request.headers.authorization
     
    //validar se o token está preenchido
    if(!authToken){
        return response.status(401).end()
    }

    const [, token] = authToken.split(" ")

    try{
        //validar se token é válido
        const { sub } = verify(token, "e840165e1cd199243a450a614e97e112") as IPayload
        //recuperar informações do usuário
        request.user_id = sub
        return next()
    }catch(err){
        return response.status(401).end()
    }

    
   
}