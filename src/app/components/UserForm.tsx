"use client";

import { AxiosError } from 'axios';
import React, { useState } from "react";
import { IuserForm, IuserFormProps } from "@/app/types/users";
import { useMutation } from '@tanstack/react-query';
import { userlogin } from "@/app/services/users";
import { userSubmit } from "@/app/services/users";
import { useRouter } from "next/navigation";

const UserForm = (props: IuserFormProps) => {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const userCurrentAction = props.type === "Submit" ?userSubmit : userlogin  

    const { mutate, isError, isPending, data, error } = useMutation({
        mutationFn: userCurrentAction,
        onSuccess: (data) => {
            if (data?.user) {
                // user store
                console.log(data.user)
                router.push('/pages/profile')
            }
        },
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formValue: IuserForm = { userName, email, password };
        mutate(formValue);
    };

    const handleError = (error: unknown) => {
        if (error instanceof AxiosError) {
            return error.response?.data?.message || "Something went wrong!";
        }
        return "An unknown error occurred!";
    };

    return (
        <div className="center mt-10 bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm p-8 bg-white rounded shadow-md"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">User Form</h2>

                {props.type === "Submit" &&
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="input-type-text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                }

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="input-type-text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="input-type-text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                    disabled={isPending}
                >
                    {isPending ? "Loading..." : props.type}
                </button>

                {isError && <div className="text-red-500 mt-4">{handleError(error)}</div>}
            </form>
        </div>
    );
};

export default UserForm;
