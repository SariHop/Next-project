import connect from '@/app/lib/db/mongodb'
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/lib/models/users";

export async function POST(req: NextRequest) {
    try {

        await connect();

        const { email, userName, password } = await req.json();

        if (!email || !userName || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const user = new UserModel({ email, userName, password })
        await user.save()
        return NextResponse.json({ message: "Submit successful", user: user });

    } catch (error: unknown) {

        // E11000 duplicate key error collection: My_Database.users index: email_1 dup key: { email: "lecturer@gmail.co" }
        if (error instanceof Error) {
            if ((error as any).code === 11000) {
                return NextResponse.json({ message: "Email already exists" }, { status: 409 });
            }
            return NextResponse.json({ message: "Error occurred", error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
    }
}
