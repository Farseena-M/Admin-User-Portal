import React, { useEffect, useState } from 'react';
import { userInstance } from '../axios_instance/UserAxios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await userInstance.get(`/api/user/profile/${userId}`);
                setUserProfile(res.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch profile');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userToken');
        navigate('/');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl font-semibold">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center text-lg font-medium">{error}</div>
        );
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gradient-to-r from-blue-200 to-cyan-700 p-10 rounded-lg shadow-2xl max-w-3xl w-full border-4 border-gray-300 mx-auto">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleLogout}
                        className="text-gray-800 hover:text-black transition duration-200 flex items-center"
                        aria-label="Logout"
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-2" />
                        Logout
                    </button>
                </div>
                <h2 className="text-4xl font-bold text-center text-cyan-900 mb-6 underline decoration-2 decoration-indigo-800">My Profile</h2>
                {userProfile ? (
                    <div className="space-y-6">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-700 font-bold text-xl italic"><strong>Name:</strong></p>
                                <p className="text-gray-600 italic text-lg">{userProfile.name}</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-700 font-bold text-xl italic"><strong>Email:</strong></p>
                                <p className="text-gray-600 italic text-lg">{userProfile.email}</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-700 font-bold text-xl italic"><strong>Phone:</strong></p>
                                <p className="text-gray-600 italic text-lg">{userProfile.phone}</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-700 font-bold text-xl italic"><strong>Location:</strong></p>
                                <p className="text-gray-600 italic text-lg">{userProfile.location}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 text-lg">No profile data available.</div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
