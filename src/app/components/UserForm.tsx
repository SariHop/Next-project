"use client";

import React,{ useState } from "react";
import {IuserForm} from "@/app/types/users"

const UserForm = () => {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const FormValue:IuserForm = {userName: userName, email: email,password: password }

        console.log(FormValue);

        // use Qurey
    };


    return (
        <div className="center mt-10 bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm p-8 bg-white rounded shadow-md"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">User Form</h2>

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
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default UserForm