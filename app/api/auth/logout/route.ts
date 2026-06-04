import { deleteAuthCookies } from "@/lib/auth-cookies";
import { connectDb } from "@/lib/db"
import { verifyRefreshToken } from "@/lib/jwt";
import { User } from "@/models/user";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        await connectDb();

        const refreshToken = req.cookies.get("refreshToken")?.value;

        if (!refreshToken) {
            const res = NextResponse.json({
                message: "user pailai logout chha jasto chha"
            })

            deleteAuthCookies(res)
            return res
        }

        const decoded = verifyRefreshToken(refreshToken) as JwtPayload;

        const userId = decoded.userId as string

        const user = await User.findById(userId);

        if (user) {
            user.refreshToken = "";
            await user.save();
        }

        const res = NextResponse.json({
            message: "logout vayeu sathi"
        }, { status: 200 })

        deleteAuthCookies(res)
        return res
    } catch (error) {
        const res = NextResponse.json({
            message: "error aayo logout ma"
        }, {
            status: 401
        })
        deleteAuthCookies(res)
        return res;
    }
}
