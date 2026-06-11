import { connectDb } from "@/lib/db";
import { verifyAccessToken } from "@/lib/jwt";
import { User } from "@/models/user";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        await connectDb();

        const accessToken =  req.cookies.get("accessToken")?.value as string;

        if (!accessToken) {
            const decoded = verifyAccessToken(accessToken) as JwtPayload;
            const userId = decoded.userId as string;

            const user = await User.findById(userId).select(
                "userName firstName lastName"
            );

            if (!user) {
                return NextResponse.json(
                    { message: "User not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json(
                {
                    user: {
                        id: user._id,
                        userName: user.userName,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                },
                { status: 200 }
            );
        } catch (error: any) {
            return NextResponse.json(
                { message: error.message || "Profile fetch failed" },
                { status: 401 }
            );
        }
    };
