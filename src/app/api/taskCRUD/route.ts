import connect from '@/app/lib/db/mongodb'
import { NextRequest, NextResponse } from "next/server";
import TaskModel from '@/app/lib/models/task';


export async function GET() {
    try {
        await connect()
        const data = await TaskModel.find()
        return NextResponse.json({ data });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: "Error occurred", error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
    }
}



export async function POST(req: NextRequest) {
    try {
        await connect()
        const { title, done, description } = await req.json()
        console.log(title, done, description)

        if (!title || !done || !description) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const task = new TaskModel({ title, done, description })
        await task.save()
        return NextResponse.json({ message: "Car create", newCar: task });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: "Error occurred", error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
    }
}
