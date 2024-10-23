import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { adminInstance } from '../axios_instance/AdminAxios';

const EditUser = () => {
    const navigate = useNavigate();
    const { userId } = useParams();

    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await adminInstance.get(`/api/user/${userId}`);
                setInitialData(res.data.data);
            } catch (error) {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
                alert('Error fetching user data. Please try again.');
            }
        };

        fetchUserData();
    }, [userId]);

    const formik = useFormik({
        initialValues: {
            name: initialData?.name || '',
            email: initialData?.email || '',
            phone: initialData?.phone || '',
            location: initialData?.location || '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            phone: Yup.string().required('Phone number is required'),
            location: Yup.string().required('Location is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .nullable(),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const res = await adminInstance.patch(`/api/user/${userId}`, values);
                alert(res.data.message);
                navigate('/users');
            } catch (error) {
                console.error('Error editing user:', error.response ? error.response.data : error.message);
                alert('Error editing user. Please try again.');
            } finally {
                setLoading(false);
            }
        },
    });

    useEffect(() => {
        if (initialData) {
            formik.setValues({
                name: initialData.name,
                email: initialData.email,
                phone: initialData.phone,
                location: initialData.location,
                password: '',
            });
        }
    }, [initialData]);

    if (!initialData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-cyan-900 min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-cyan-700 mb-6">Edit User</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-1 text-center">Name</label>
                        <input
                            type="text"
                            id="name"
                            {...formik.getFieldProps('name')}
                            className={`border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 w-full text-center focus:outline-none focus:ring-2 focus:ring-cyan-600`}
                            placeholder="Enter your name"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500 text-sm text-center">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1 text-center">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...formik.getFieldProps('email')}
                            className={`border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 w-full text-center focus:outline-none focus:ring-2 focus:ring-cyan-600`}
                            placeholder="Enter your email"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm text-center">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1 text-center">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            {...formik.getFieldProps('phone')}
                            className={`border ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 w-full text-center focus:outline-none focus:ring-2 focus:ring-cyan-600`}
                            placeholder="Enter your phone number"
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="text-red-500 text-sm text-center">{formik.errors.phone}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-gray-700 font-semibold mb-1 text-center">Location</label>
                        <input
                            type="text"
                            id="location"
                            {...formik.getFieldProps('location')}
                            className={`border ${formik.touched.location && formik.errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 w-full text-center focus:outline-none focus:ring-2 focus:ring-cyan-600`}
                            placeholder="Enter your location"
                        />
                        {formik.touched.location && formik.errors.location ? (
                            <div className="text-red-500 text-sm text-center">{formik.errors.location}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1 text-center">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...formik.getFieldProps('password')}
                            className={`border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 w-full text-center focus:outline-none focus:ring-2 focus:ring-cyan-600`}
                            placeholder="Leave blank to keep current password"
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
                            'Update User'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
