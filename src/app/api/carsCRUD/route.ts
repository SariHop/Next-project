import connect from '@/app/lib/db/mongodb'
import { NextRequest, NextResponse } from "next/server";
import CarsModel from '@/app/lib/models/car';


export async function GET() {
    try {
        await connect()
        const data = await CarsModel.find()
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
        const { make, model, year } = await req.json()

        if (!make || !model || !year) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const car = new CarsModel({ make, model, year })
        await car.save()
        return NextResponse.json({ message: "Car create", newCar: car });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: "Error occurred", error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
    }
}
