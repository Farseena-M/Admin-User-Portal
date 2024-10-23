import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(true);

    const formik = useFormik({
        initialValues: {
            usernameOrEmail: '',
            password: '',
        },
        validationSchema: Yup.object({
            usernameOrEmail: Yup.string().required(isAdmin ? 'Username is required' : 'Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters long.')
                .required('Password is required.'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const payload = {
                    password: values.password,
                };

                if (isAdmin) {
                    payload.username = values.usernameOrEmail;
                } else {
                    payload.email = values.usernameOrEmail;
                }

                const res = await axios.post(
                    `http://localhost:5000/api/${isAdmin ? 'admin' : 'user'}/login`,
                    payload
                );
                const Data = res.data;
                // console.log(Data);

                if (Data.role === 'admin') {
                    localStorage.setItem('adminToken', Data.token);
                    navigate('/users');
                } else if (Data.role === 'user') {
                    localStorage.setItem('userToken', Data.token);
                    localStorage.setItem('userId', Data.id);
                    navigate('/profile');
                } else {
                    throw new Error('Unknown role');
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    console.warn('Your account has been blocked.');
                } else {
                    console.error('Login failed. Please check your credentials and try again.');
                }
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="bg-cyan-900 min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                <h2 className="text-2xl font-bold text-center text-cyan-700 mb-6">Login</h2>

                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => setIsAdmin(true)}
                        className={`px-4 py-2 rounded-l-lg ${isAdmin ? 'bg-cyan-800 text-white' : 'bg-gray-300'}`}
                    >
                        Admin
                    </button>
                    <button
                        onClick={() => setIsAdmin(false)}
                        className={`px-4 py-2 rounded-r-lg ${!isAdmin ? 'bg-cyan-800 text-white' : 'bg-gray-300'}`}
                    >
                        User
                    </button>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="usernameOrEmail" className="block text-gray-700 font-semibold mb-1">
                            {isAdmin ? 'Username' : 'Email'}
                        </label>
                        <input
                            type={isAdmin ? 'text' : 'email'}
                            id="usernameOrEmail"
                            {...formik.getFieldProps('usernameOrEmail')}
                            className={`border ${formik.touched.usernameOrEmail && formik.errors.usernameOrEmail
                                ? 'border-red-500'
                                : 'border-gray-300'
                                } rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-600`}
                            placeholder={isAdmin ? 'Enter your username' : 'Enter your email'}
                        />
                        {formik.touched.usernameOrEmail && formik.errors.usernameOrEmail ? (
                            <div className="text-red-500 text-sm text-center">{formik.errors.usernameOrEmail}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...formik.getFieldProps('password')}
                            className={`border ${formik.touched.password && formik.errors.password
                                ? 'border-red-500'
                                : 'border-gray-300'
                                } rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-600`}
                            placeholder="Enter your password"
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-sm text-center">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <button
                        type="submit"
                        className="bg-cyan-800 text-white w-full p-2 rounded-md hover:bg-cyan-700 transition duration-200 font-semibold relative"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                                    ></path>
                                </svg>
                                Loading...
                            </span>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
