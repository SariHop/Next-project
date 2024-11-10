import connect from '@/app/lib/db/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import TaskModel from '@/app/lib/models/task';


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const { id } = await params
        const { title, done, description } = await req.json();
        console.log(title, done, description)

        const updatedTask = await TaskModel.findByIdAndUpdate(id, { title, done, description }, { new: true });

        if (!updatedTask) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Task updated', updatedTask });
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
        const { id } = await params

        const deletedTask = await TaskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Task deleted', deletedTask });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Error occurred', error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
}
