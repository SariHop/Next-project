import connect from '@/app/lib/db/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import BooksModel from '@/app/lib/models/book';


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const {id} = await params
        const {title,author,publicationYear } = await req.json();
        console.log(title,author,publicationYear)

        const updateBook = await BooksModel.findByIdAndUpdate(id, {title,author,publicationYear }, { new: true });
        
        if (!updateBook) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Book updated', updateBook });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Error occurred', error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const {id} = await params

        const deletedBook = await BooksModel.findByIdAndDelete(id);
        if (!deletedBook) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Book deleted', deletedBook });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Error occurred', error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
}
