import { useState } from 'react'
import Button from '../components/Button';
import logoImage from '../assets/guardstar_logo.jpg'
import { useDispatch } from 'react-redux';
import { SignIn } from '../action/team';
import {  useNavigate } from 'react-router-dom';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const login =async () => {
        const data = {
            "username" : username,
            "password" : password
        }
        const response = await dispatch(SignIn(data));
        if(response) {
            console.log("hello");
            navigate("/home");
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
                    <Button handleChange={login} size="small" name="login" variant="secondary-small" />

                </div>

            </div>
        </div>

    )
}

export default Login

