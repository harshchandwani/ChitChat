import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    }
    return (
        <div className=" font-family-karla h-screen">
            <div className="w-full flex flex-wrap">
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
                        <a href="#" className="text-5xl bg-gradient-to-t text-transparent bg-clip-text from-pink-300 via-orange-400 to-purple-700 p-4" alt="Logo">Chit Chat</a>
                    </div>

                    <div className="flex flex-col justify-center md:justfy-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <p className="text-center text-3xl">Welcome Back</p>
                        <form className="text-left flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
                            <div className="flex flex-col pt-4">
                                <label for="email" className="text-lg">Username</label>
                                <input
                                    type="text"
                                    placeholder="your@email.com"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col pt-4">
                                <label for="password" className="text-lg">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className='flex flex-col pt-4 '>
                                <button className='rounded-lg bg-gradient-to-t from-pink-300 via-orange-400 to-purple-700 text-black font-bold text-lg hover:bg-gray-700 p-2 mt-8'>Login</button>
                            </div>

                        </form>
                        <div className="text-center pt-12 pb-12">
                            <p>Don't have an account? <Link to={'/signup'} className="underline font-semibold">Sign up here.</Link></p>
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

export default Login