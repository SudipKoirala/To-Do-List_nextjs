// read refreshToken from cookie
// verify refresh token
// get userId from token
// find user in DB
// check DB refresh token matches cookie refresh token
// generate new access token
// send new access token back in cookie

import { NextRequest } from "next/server"


const POST=(req: NextRequest)=>{
    const refreshToken = req.cookies?.get
}