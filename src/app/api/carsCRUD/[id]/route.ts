import connect from '@/app/lib/db/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import CarsModel from '@/app/lib/models/car';

// Update a car by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const {id} = await params
        const { make, modal, year } = await req.json();
        console.log(make, modal, year)

        const updatedCar = await CarsModel.findByIdAndUpdate(id, { make, modal, year }, { new: true });
        
        if (!updatedCar) {
            return NextResponse.json({ message: 'Car not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Car updated', updatedCar });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Error occurred', error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
}

// Delete a car by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const {id} = await params

        const deletedCar = await CarsModel.findByIdAndDelete(id);
        if (!deletedCar) {
            return NextResponse.json({ message: 'Car not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Car deleted', deletedCar });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Error occurred', error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
}
