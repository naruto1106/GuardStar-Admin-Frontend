import { useState } from 'react'
import Button from '../components/Button';
import logoImage from '../assets/guardstar_logo.jpg'
import { useDispatch } from 'react-redux';
import { SignUp } from '../action/team';
import {  useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";



const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [conPassword, setConPassword] = useState("");
    const register =async () => {
        if(conPassword != password) {
            toast.error("Confirm password is not correct.");
            return
        }
        const data = {
            "username" : username,
            "email" : email,
            "phone" : phone,
            "password" : password,
            "con_password" : conPassword,
        }
        const response = await dispatch(SignUp(data));
        if(response) {
            console.log("hello");
            navigate("/login");
        }
    }

    return (
        <div className="w-full h-[100vh] flex justify-center items-center bg-navbar">
            <div className='w-[390px] h-fit'>
                <div className="flex justify-center">
                    <img src={logoImage} alt="logoImage" className='w-[200px]' />
                </div>
                <div className='text-center mt-5'>
                    <label htmlFor="username" className="uppercase text-white text-center font-medium leading-6">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full mt-2 block rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className='text-center mt-5'>
                    <label htmlFor="email" className="uppercase text-white text-center font-medium leading-6">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-2 block rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className='text-center mt-5'>
                    <label htmlFor="phone" className="uppercase text-white text-center font-medium leading-6">
                        Phone:
                    </label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full mt-2 block rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className='text-center mt-5'>
                    <label htmlFor="password" className="uppercase text-white text-center font-medium leading-6">
                        password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-2 block rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className='text-center mt-5'>
                    <label htmlFor="con_password" className="uppercase text-white text-center font-medium leading-6">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="con_password"
                        id="con_password"
                        value={conPassword}
                        onChange={(e) => setConPassword(e.target.value)}
                        className="w-full mt-2 block rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className='text-center mt-3'>
                    <a href='/login' className="text-white text-center font-medium leading-6">
                        Already have an account? Log in
                    </a>
                </div>
                <div className='text-center mt-5'>
                    <Button handleChange={register} size="small" name="Signup" variant="secondary-small" />

                </div>

            </div>
        </div>

    )
}

export default Register

