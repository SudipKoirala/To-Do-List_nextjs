import jwt from "jsonwebtoken";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN as string;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN as string;
console.log(`[JWT Init] ACCESS_TOKEN: ${ACCESS_TOKEN ? ACCESS_TOKEN.substring(0, 20) + '...' : 'MISSING'}`);
console.log(`[JWT Init] REFRESH_TOKEN: ${REFRESH_TOKEN ? REFRESH_TOKEN.substring(0, 20) + '...' : 'MISSING'}`);
if (!ACCESS_TOKEN) {
    throw new Error("Khali chha jasto chha JWT in env")
}
if (!REFRESH_TOKEN) {
    throw new Error("Khali chha jasto chha JWT in env")
}

export function generateAccessToken(userId: string) {
    return jwt.sign({ userId }, ACCESS_TOKEN, { expiresIn: "15m" })
}
export function generateRefreshToken(userId: string) {
    console.log(`[JWT] Generating access token for userId: ${userId}, secret length: ${ACCESS_TOKEN.length}`)
    const token = jwt.sign({ userId }, ACCESS_TOKEN, { expiresIn: "15m" })
    console.log(`[JWT] Generated token: ${token.substring(0, 50)}...`)
    return token
}

export function verifyAccessToken(token: string) {
    try {
        console.log(`[JWT] Verifying token: ${token.substring(0, 50)}..., secret length: ${ACCESS_TOKEN.length}`)
        return jwt.verify(token, ACCESS_TOKEN)
    } catch (error: any) {
        console.log(`[JWT] Verification error: ${error.message}`)
        throw new Error("verification fail vayo hai ta")
    }
}
export function verifyRefreshToken(token: string) {
    try {
        return jwt.verify(token, REFRESH_TOKEN)
    } catch (error) {
        throw new Error("verification fail vayo hai ta")
    }
}