import jwt from "jsonwebtoken";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN as string ;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN as string ;

if(!ACCESS_TOKEN){
 throw new Error("Khali chha jasto chha JWT in env")
}
if(!REFRESH_TOKEN){
 throw new Error("Khali chha jasto chha JWT in env")
}

export function generateAccessToken (userId: string){
    return jwt.sign({userId}, ACCESS_TOKEN, {expiresIn:"15m"})
}
export function generateRefreshToken (userId: string){
    return jwt.sign({userId}, REFRESH_TOKEN, {expiresIn:"7d"})
}

export function verifyAccessToken (token: string){
    try {
        return jwt.verify(token, ACCESS_TOKEN)
    } catch (error) {
        throw new Error ("verification fail vayo hai ta")
    }
}
export function verifyRefreshToken (token: string){
    try {
        return jwt.verify(token, REFRESH_TOKEN)
    } catch (error) {
        throw new Error ("verification fail vayo hai ta")
    }
}