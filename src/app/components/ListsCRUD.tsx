"use client";

import React, { useEffect, useState } from 'react';
import { carGet, carCreate, carDelete, carUpdate } from '../services/cars';
import { Car, CarForm } from '../types/car';
import { AxiosError } from 'axios';

const ListsCRUD = () => {
    const [make, setMake] = useState('');
    const [modal, setModal] = useState('');
    const [year, setYear] = useState('');
    const [carsList, setCarsList] = useState<Car[]>([]);

    const fetchData = async () => {
        try {
            const data = await carGet();
            setCarsList(data.data);
        } catch (error) {
            console.error("Failed to fetch cars list:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async () => {
        try {
            const newCar: CarForm = { make, modal, year: parseInt(year) || 0 };
            await carCreate(newCar);
            fetchData();
            setMake('');
            setModal('');
            setYear('');
        } catch (error) {

            if (error instanceof AxiosError) {
                alert( error.response?.data?.message || "Something went wrong!")
            } else {
                console.error(error)
            }
        }
    };

    const handleUpdate = async (car: Car) => {
        try {
            const updateCar: CarForm = { make, modal, year: parseInt(year) || 0 };
            await carUpdate(updateCar, car._id);
            fetchData();
            setMake('');
            setModal('');
            setYear('');
        } catch (error) {
            if (error instanceof AxiosError) {
                alert( error.response?.data?.message || "Something went wrong!")
            } else {
                console.error(error)
            }
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await carDelete(id);
            fetchData();
        } catch (error) {
            console.error("Failed to delete car:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-50 shadow-lg rounded-lg mt-10">
           
            <div className="mb-5">
                <input
                    value={make}
                    placeholder="Make"
                    onChange={(e) => setMake(e.target.value)}
                    className="input-type-text"
                />
                <input
                    value={modal}
                    placeholder="Model"
                    onChange={(e) => setModal(e.target.value)}
                    className="input-type-text"
                />
                <input
                    value={year}
                    placeholder="Year"
                    onChange={(e) => setYear(e.target.value)}
                    className="input-type-text"
                />
                <button
                    onClick={handleCreate}
                    className="w-full button bg-blue-500 hover:bg-blue-600"
                >
                    Create
                </button>
            </div>

            {carsList && carsList.map((car: Car) => (
                <div key={car._id} className="mb-4 p-4 bg-white rounded shadow-md">
                    <p className="mb-2 text-gray-700">
                        <span className="font-semibold">Make:</span> {car.make}
                        <span className="font-semibold ml-4">Modal:</span> {car.modal}
                        <span className="font-semibold ml-4">Year:</span> {car.year}
                    </p>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleUpdate(car)}
                            className="button bg-yellow-500 hover:bg-yellow-600"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => handleDelete(car._id)}
                            className="button bg-red-500 hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListsCRUD;
