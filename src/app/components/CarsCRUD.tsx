"use client";

import React, { useEffect, useState } from 'react';
import { carGet, carCreate, carDelete, carUpdate } from '../services/cars';
import { Car, CarForm } from '../types/car';
import { AxiosError } from 'axios';
import Input from './Input'

const CarsCRUD = () => {
    const [make, setMake] = useState('');
    const [modal, setModal] = useState('');
    const [year, setYear] = useState('');
    const [carsList, setCarsList] = useState<Car[]>([]);
    const [editingCarId, setEditingCarId] = useState<string | null>(null);

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

    const resetForm = () => {
        setMake('');
        setModal('');
        setYear('');
        setEditingCarId(null);
    };

    const handleCreate = async () => {
        try {
            const newCar: CarForm = { make, modal, year: parseInt(year) || 0 };
            await carCreate(newCar);
            fetchData();
            resetForm();
        } catch (error) {
            handleError(error);
        }
    };

    const handleUpdate = async () => {
        if (!editingCarId) return;
        try {
            const updateCar: CarForm = { make, modal, year: parseInt(year) || 0 };
            await carUpdate(updateCar, editingCarId);
            fetchData();
            resetForm();
        } catch (error) {
            handleError(error);
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

    const handleError = (error: unknown) => {
        if (error instanceof AxiosError) {
            alert(error.response?.data?.message || "Something went wrong!");
        } else {
            console.error(error);
        }
    };

    const startEdit = (car: Car) => {
        setMake(car.make);
        setModal(car.modal);
        setYear(car.year.toString());
        setEditingCarId(car._id);
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-50 shadow-lg rounded-lg mt-10">
            <div className="mb-5">
                <Input value={make} setValue={setMake} placholder={"Make"}/>
                <Input value={modal} setValue={setModal} placholder={"Model"}/>
                <Input value={year} setValue={setYear} placholder={"Year"}/>
                    
                <button
                    onClick={editingCarId ? handleUpdate : handleCreate}
                    className="w-full button bg-blue-500 hover:bg-blue-600"
                >
                    {editingCarId ? "Update" : "Create"}
                </button>
            </div>

            {carsList.length ? (
                carsList.map((car) => (
                    <div key={car._id} className="mb-4 p-4 bg-white rounded shadow-md">
                        <p className="mb-2 text-gray-700">
                            <span className="font-semibold">Make:</span> {car.make}
                            <span className="font-semibold ml-4">Model:</span> {car.modal}
                            <span className="font-semibold ml-4">Year:</span> {car.year}
                        </p>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => startEdit(car)}
                                className="button bg-yellow-500 hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(car._id)}
                                className="button bg-red-500 hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No cars available</p>
            )}
        </div>
    );
};

export default CarsCRUD;
