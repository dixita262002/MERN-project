/*import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaCircle, FaUserCircle } from "react-icons/fa";

export const TeamManagement = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedMemberId, setExpandedMemberId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMember, setEditMember] = useState(null);

    useEffect(() => {
        getAllTeamMembers();
    }, []);

    const getAllTeamMembers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/teamMember/allteammembers");
            setTeamMembers(res.data.teamMembers);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch team members:", err);
            setError("Failed to fetch team members.");
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Online":
                return "text-green-500";
            case "Offline":
                return "text-gray-500";
            case "Busy":
                return "text-red-500";
            default:
                return "text-blue-500";
        }
    };

    const handleToggle = (id) => {
        setExpandedMemberId(prev => (prev === id ? null : id));
    };

    const openEditModal = (member) => {
        setEditMember(member);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditMember(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditMember(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:3000/teamMember/${editMember._id}`, editMember);
            getAllTeamMembers();
            closeModal();
        } catch (error) {
            console.error("Error updating team member:", error);
        }
    };

    return (
        <div className="p-6 bg-sky-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-blue-800">My Team Members</h1>

            {loading ? (
                <p className="text-blue-600">Loading team members...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : teamMembers.length > 0 ? (
                <div className="grid gap-6">
                    {teamMembers.map((member) => (
                        <div
                            key={member._id}
                            className="bg-white border-l-4 border-blue-500 shadow-md rounded-lg overflow-hidden"
                        >
                            <div
                                className="flex justify-between items-center px-5 py-4 bg-blue-100 hover:bg-blue-200 cursor-pointer"
                                onClick={() => handleToggle(member._id)}
                            >
                                <div className="flex items-center gap-4">
                                    <FaUserCircle size={36} className="text-blue-600" />
                                    <div>
                                        <h2 className="font-semibold text-lg text-blue-800">{member.name}</h2>
                                        <p className="text-sm text-blue-700">{member.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCircle className={`${getStatusColor(member.status)}`} size={12} />
                                    <span className="text-sm text-blue-700">{member.status || "Unknown"}</span>
                                </div>
                            </div>

                            {expandedMemberId === member._id && (
                                <div className="bg-blue-50 px-6 py-4 text-sm text-blue-800">
                                    <p><strong>Name:</strong> {member.name}</p>
                                    <p><strong>Email:</strong> {member.email}</p>
                                    <p><strong>Role:</strong> {member.role}</p>
                                    <p><strong>Status:</strong> {member.status || "Unknown"}</p>
                                    <p><strong>Project ID:</strong> {member.projectId?._id || "N/A"}</p>
                                    <p><strong>Task ID:</strong> {member.taskId?._id || "N/A"}</p>

                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={() => openEditModal(member)}
                                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => alert(`Message to ${member.name}`)}
                                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                                        >
                                            Message
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No team members found.</p>
            )}

            {/* Modal */
            /*{isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md border-2 border-blue-400">
                        <h2 className="text-xl font-bold mb-4 text-blue-700">Edit Member</h2>
                        <div className="space-y-4">
                            <input
                                name="name"
                                value={editMember.name}
                                onChange={handleEditChange}
                                placeholder="Name"
                                className="w-full border border-blue-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                name="email"
                                value={editMember.email}
                                onChange={handleEditChange}
                                placeholder="Email"
                                className="w-full border border-blue-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                name="role"
                                value={editMember.role}
                                onChange={handleEditChange}
                                placeholder="Role"
                                className="w-full border border-blue-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                name="status"
                                value={editMember.status}
                                onChange={handleEditChange}
                                placeholder="Status"
                                className="w-full border border-blue-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
*/

import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaCircle, FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const TeamManagement = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedMemberId, setExpandedMemberId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMember, setEditMember] = useState(null);

    useEffect(() => {
        getAllTeamMembers();
    }, []);

    const getAllTeamMembers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/teamMember/allteammembers");
            setTeamMembers(res.data.teamMembers);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch team members:", err);
            setError("Failed to fetch team members.");
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Online":
                return "text-green-500";
            case "Offline":
                return "text-gray-500";
            case "Busy":
                return "text-red-500";
            default:
                return "text-blue-500";
        }
    };

    const handleToggle = (id) => {
        setExpandedMemberId(prev => (prev === id ? null : id));
    };

    const openEditModal = (member) => {
        setEditMember(member);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditMember(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditMember(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:3000/teamMember/updateteammember/${editMember._id}`, editMember);
            toast.success("Team member updated successfully!");
            getAllTeamMembers();
            closeModal();
        } catch (error) {
            console.error("Error updating team member:", error);
            toast.error("Failed to update team member.");
        }
    };

    return (
        <div className="p-6 bg-sky-50 min-h-screen">
            <ToastContainer position="top-right" autoClose={3000} />

            <h1 className="text-3xl font-bold mb-6 text-blue-800">My Team Members</h1>

            {loading ? (
                <p className="text-blue-600">Loading team members...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : teamMembers.length > 0 ? (
                <div className="grid gap-6">
                    {teamMembers.map((member) => (
                        <div
                            key={member._id}
                            className="bg-white border-l-4 border-blue-500 shadow-md rounded-lg overflow-hidden"
                        >
                            <div
                                className="flex justify-between items-center px-5 py-4 bg-blue-100 hover:bg-blue-200 cursor-pointer"
                                onClick={() => handleToggle(member._id)}
                            >
                                <div className="flex items-center gap-4">
                                    <FaUserCircle size={36} className="text-blue-600" />
                                    <div>
                                        <h2 className="font-semibold text-lg text-blue-800">{member.name}</h2>
                                        <p className="text-sm text-blue-700">{member.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCircle className={`${getStatusColor(member.status)}`} size={12} />
                                    <span className="text-sm text-blue-700">{member.status || "Unknown"}</span>
                                </div>
                            </div>

                            {expandedMemberId === member._id && (
                                <div className="bg-blue-50 px-6 py-4 text-sm text-blue-800">
                                    <p><strong>Name:</strong> {member.name}</p>
                                    <p><strong>Email:</strong> {member.email}</p>
                                    <p><strong>Role:</strong> {member.role}</p>
                                    <p><strong>Status:</strong> {member.status || "Unknown"}</p>
                                    <p><strong>Project ID:</strong> {member.projectId?._id || "N/A"}</p>
                                    <p><strong>Task ID:</strong> {member.taskId?._id || "N/A"}</p>

                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={() => openEditModal(member)}
                                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => alert(`Message to ${member.name}`)}
                                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                                        >
                                            Message
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No team members found.</p>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md border-2 border-blue-400">
                        <h2 className="text-xl font-bold mb-4 text-blue-700">Edit Member</h2>
                        <div className="space-y-4">
                            <input
                                name="name"
                                value={editMember.name}
                                onChange={handleEditChange}
                                placeholder="Name"
                                className="w-full border border-blue-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                name="email"
                                value={editMember.email}
                                onChange={handleEditChange}
                                placeholder="Email"
                                className="w-full border border-blue-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                name="role"
                                value={editMember.role}
                                onChange={handleEditChange}
                                placeholder="Role"
                                className="w-full border border-blue-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                name="status"
                                value={editMember.status}
                                onChange={handleEditChange}
                                placeholder="Status"
                                className="w-full border border-blue-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
