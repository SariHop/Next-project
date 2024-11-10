import connect from '@/app/lib/db/mongodb'
import { NextRequest, NextResponse } from "next/server";
import BooksModel from '@/app/lib/models/book';


export async function GET() {
    try {
        await connect()
        const data = await BooksModel.find()
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
        const { title,author,publicationYear } = await req.json()
        console.log(title,author,publicationYear)

        if (!title || !author || !publicationYear) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const book = new BooksModel({title,author,publicationYear})
        await book.save()
        return NextResponse.json({ message: "Book create", newCar: book });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: "Error occurred", error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
    }
}
