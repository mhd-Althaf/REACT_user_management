import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import API from "../api/axios";

import toast from "react-hot-toast";

function AdminUsersPage() {
    const { userInfo } = useSelector((state) => state.auth);

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await API.get(
                "/users",
                config
            );

            setUsers(data);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteHandler = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await API.delete(
                `/users/${id}`,
                config
            );

            toast.success("User deleted");

            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const roleHandler = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await API.put(
                `/users/${id}/role`,
                {},
                config
            );

            toast.success("Role updated");

            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>

            <br />

            <table
                border="1"
                cellPadding="10"
                cellSpacing="0"
                width="100%"
            >
                <thead>
                    <tr>
                        <th>Image</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Role</th>

                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                {user.profileImage ? (
                                    <img
                                        src={`http://localhost:5000/${user.profileImage}`}
                                        alt="profile"
                                        width="60"
                                        height="60"
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                        }}
                                    />
                                ) : (
                                    "No Image"
                                )}
                            </td>

                            <td>{user.name}</td>

                            <td>{user.email}</td>

                            <td>{user.role}</td>

                            <td>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                    }}
                                >
                                    {user._id !== userInfo.id && (
                                        <button
                                            onClick={() => roleHandler(user._id)}
                                        >
                                            Change Role
                                        </button>
                                    )}

                                    {user._id !== userInfo.id && (
                                        <button
                                            onClick={() => deleteHandler(user._id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminUsersPage;