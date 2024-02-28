import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from "../../hooks/useSignup.js"
import toast from 'react-hot-toast'
import { z } from 'zod';
// Define the schema using Zod
const schema = z.object({
    fullName: z.string().max(20),
    username: z.string().max(10), // Assuming username is an email
    password: z.string().min(8), // Password should be at least 8 characters
    confirmPassword: z.string(),
    gender: z.string().optional(),
});
const Signup = () => {
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    })
    const { loading, signup } = useSignup();
    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate inputs against schema
            schema.parse(inputs);
            await signup(inputs);
        } catch (error) {
            // Handle validation errors
            toast.error("Name should not exceed 20 char")
            return;

        }
    }

    return (
        <div className=" font-family-karla h-screen">
            <div className="w-full flex flex-wrap">
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
                        <a href="#" className="text-5xl bg-gradient-to-t text-transparent bg-clip-text from-pink-300 via-orange-400 to-purple-700  p-4" alt="Logo">Chit Chat</a>
                    </div>

                    <div className="flex flex-col justify-center md:justfy-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <p className="text-center text-3xl">Join Us.</p>
                        <form className="text-left flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
                            <div className="flex flex-col pt-4">
                                <label className="text-lg">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="John Smith"
                                    className="shadow appearance-none border rounded w-full py-2 px-3  mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    value={inputs.fullName}
                                    onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                                />
                            </div>

                            <div className="flex flex-col pt-4">
                                <label className="text-lg">Username</label>
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="Johnhehe"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    value={inputs.username}
                                    onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                                />
                            </div>

                            <div className="flex flex-col pt-4">
                                <label className="text-lg">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    value={inputs.password}
                                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                />
                            </div>

                            <div className="flex flex-col pt-4">
                                <label className="text-lg">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="Password"
                                    value={inputs.confirmPassword}
                                    onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className='flex flex-col pt-4'>
                                <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
                            </div>

                            <div className='flex flex-col pt-4'>
                                <button className='rounded-lg bg-gradient-to-t from-pink-300 via-orange-400 to-purple-700 text-black font-bold text-lg hover:bg-gray-700 p-2 mt-8'>Sign Up</button>
                            </div>

                        </form>
                        <div className="text-center pt-12 pb-12">
                            <p>Already have an account? <Link to={'/login'} className="underline font-semibold">Log in here.</Link></p>
                        </div>
                    </div>

                </div>
                {/* IMage */}
                <div className="w-1/2 bg-transparent">
                    <img className="object-cover w-full h-screen hidden md:block" src="/bg-login.png" alt="Background" />
                </div>
            </div>

        </div>
    )

}
export default Signup