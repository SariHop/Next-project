import connect from '@/app/lib/db/mongodb'
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/lib/models/users";

export async function POST(req: NextRequest) {
    try {
        await connect();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            const isPasswordCorrect = existingUser.password === password;

            if (isPasswordCorrect) {
                return NextResponse.json({ message: "Login successful", user: existingUser });
            } else {
                return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
            }
        } else {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: "Error occurred", error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
    }
}
