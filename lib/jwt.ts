import jwt from "jsonwebtoken";

const JWT = process.env.JWT_SEC as string ;

if(!JWT){
 throw new Error("Khali chha jasto chha JWT in env")
}

export function generateToken (userId: string){
    return jwt.sign({userId}, JWT, {expiresIn:"7d"})
}

export function verifyToken (token: string){
    try {
        return jwt.verify(token, JWT)
    } catch (error) {
        throw new Error ("verify fail vayo hai ta")
    }
}