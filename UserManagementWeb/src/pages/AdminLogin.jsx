import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const trimmedValues = {
                username: values.username.trim(),
                password: values.password.trim(),
            };
            try {
                const res = await axios.post('http://localhost:5000/api/admin/login', trimmedValues);
                const adminToken = res.data.token;
                localStorage.setItem('adminToken', adminToken);
                navigate('/users')
            } catch (error) {
                console.error('Login error:', error.response ? error.response.data : error.message);
                alert('Login failed. Please check your credentials.');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="bg-cyan-900 min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                <h2 className="text-2xl font-bold text-center text-cyan-700 mb-6">Admin Login</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">Username</label>
                        <input
                            type="text"
                            id="username"
                            {...formik.getFieldProps('username')}
                            className={`border ${formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-600`}
                            placeholder="Enter your username"
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className="text-red-500 text-sm text-center">{formik.errors.username}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...formik.getFieldProps('password')}
                            className={`border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-600`}
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
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"></path>
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

export default AdminLogin;
