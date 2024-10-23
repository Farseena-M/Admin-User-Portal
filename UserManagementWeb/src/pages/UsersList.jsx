import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminInstance } from '../axios_instance/AdminAxios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const res = await adminInstance.get('/api/user/all');
            setUsers(res.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await adminInstance.delete(`/api/user/${userId}`);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleEdit = (userId) => {
        navigate(`/edit-user/${userId}`);
    };

    const handleAddUser = () => {
        navigate('/adduser');
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/');
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="bg-cyan-900 min-h-screen p-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center text-cyan-700 mb-4">Users List</h2>

                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleAddUser}
                        className="flex items-center text-white bg-cyan-600 hover:bg-cyan-800 px-4 py-2 rounded-md mr-4"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add User
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center text-gray-600 hover:text-black transition duration-200"
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        Logout
                    </button>
                </div>

                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-cyan-600 text-white">
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Phone</th>
                            <th className="py-2 px-4">Location</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-b hover:bg-gray-100">
                                <td className="py-2 px-4">{user.name}</td>
                                <td className="py-2 px-4">{user.email}</td>
                                <td className="py-2 px-4">{user.phone}</td>
                                <td className="py-2 px-4">{user.location}</td>
                                <td className="py-2 px-4 flex justify-center">
                                    <button
                                        onClick={() => handleEdit(user._id)}
                                        className="text-cyan-600 hover:text-cyan-800 mr-4"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && <p className="text-center text-gray-500 mt-4">No users found.</p>}
            </div>
        </div>
    );
};

export default UsersList;
