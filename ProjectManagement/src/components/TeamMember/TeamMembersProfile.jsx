/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  User, Mail, Briefcase, Eye, Pencil, Trash2, X, Check
} from 'lucide-react';
import "../../assets/TeamMembersProfile.css"

export const TeamMembersProfile = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '' });

  const fetchTeamMembers = async () => {
    try {
      const res = await axios.get(`/teammember/allteammembers`);
      setTeamMembers(res.data.teamMembers);
      setFilteredMembers(res.data.teamMembers);
    } catch (err) {
      console.error("Error fetching team members:", err);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = teamMembers.filter(member =>
      member.name.toLowerCase().includes(value) ||
      member.email.toLowerCase().includes(value)
    );
    setFilteredMembers(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        await axios.delete(`/teammember/deleteteammember/${id}`);
        fetchTeamMembers();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleViewProfile = async (id) => {
    try {
      const res = await axios.get(`/teammember/profile/${id}`);
      setSelectedProfile(res.data);
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  const handleEdit = (member) => {
    setEditingId(member._id);
    setEditFormData({ name: member.name, email: member.email });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({ name: '', email: '' });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`/teammember/updateteammember/${id}`, editFormData);
      fetchTeamMembers();
      handleCancelEdit();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 text-center min-h-screen">
    {/*</div><div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">*/

     /*<h1 className="text-3xl font-bold mb-6 text-indigo-700">👥 Team Member Profiles</h1>

      {/* 🔍 Search */
    /*<div className="mb-6 max-w-lg bg-gray-100">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 px-4 py-2 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */
      /*<div className='text-center'>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-center text-gray-700">
          <thead className="bg-indigo-1000 text-center">
            <tr>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Email</th>
              <th className="px-6 py-3 font-semibold">Role</th>
              <th className="px-6 py-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member._id} className="border-t text-center hover:bg-gray-50">
                <td className="px-6  py-3">
                  {editingId === member._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditInputChange}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    <span className="flex items-center gap-2"><User size={16} />{member.name}</span>
                  )}
                </td>
                <td className="px-6 py-3">
                  {editingId === member._id ? (
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditInputChange}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    <span className="flex items-center gap-2"><Mail size={16} />{member.email}</span>
                  )}
                </td>
                <td className="px-6 py-3">
                  <span className="flex items-center gap-2"><Briefcase size={16} />{member.role}</span>
                </td>
                <td className="px-6 py-3 text-center space-x-2">
                  {editingId === member._id ? (
                    <>
                      <button onClick={() => handleUpdate(member._id)} className="bg-green-500 text-green px-2 py-1 rounded hover:bg-green-600">
                        <Check size={16} />
                      </button>
                      <button onClick={handleCancelEdit} className="bg-gray-400 text-green px-2 py-1 rounded hover:bg-gray-500">
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleViewProfile(member._id)} className="bg-blue-500 text-green px-2 py-1 rounded hover:bg-blue-600">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleEdit(member)} className="bg-yellow-500 text-green px-2 py-1 rounded hover:bg-yellow-600">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(member._id)} className="bg-red-600 text-green px-2 py-1 rounded hover:bg-red-700">
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {filteredMembers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-blue-500">No team members found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
      {/* Profile Card */

/*{selectedProfile && (
  <div className="mt-8 bg-white p-6 rounded-lg shadow-lg border max-w-3xl mx-auto">
    <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">📋 Team Member Profile</h2>
    <table className="min-w-full text-left text-blue-800">
      <tbody>
        <tr className="border-b">
          <td className="py-2 font-semibold">👤 Name</td>
          <td className="py-2">{selectedProfile.name}</td>
        </tr>
        <tr className="border-b">
          <td className="py-2 font-semibold">📧 Email</td>
          <td className="py-2">{selectedProfile.email}</td>
        </tr>
        <tr className="border-b">
          <td className="py-2 font-semibold">🎯 Role</td>
          <td className="py-2">{selectedProfile.role}</td>
        </tr>
        <tr className="border-b">
          <td className="py-2 font-semibold">📁 Projects Assigned</td>
          <td className="py-2">{selectedProfile.projectsCount}</td>
        </tr>
        <tr className="border-b">
          <td className="py-2 font-semibold">📝 Tasks Assigned</td>
          <td className="py-2">{selectedProfile.assignedTasks}</td>
        </tr>
        <tr>
          <td className="py-2 font-semibold">✅ Tasks Completed</td>
          <td className="py-2">{selectedProfile.completedTasks}</td>
        </tr>
      </tbody>
    </table>
  </div>
)}

    </div>
  );
};
*/


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  User, Mail, Briefcase, Eye, Pencil, Trash2, X, Check
} from 'lucide-react';

export const TeamMembersProfile = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '' });

  const fetchTeamMembers = async () => {
    try {
      const res = await axios.get(`/teammember/allteammembers`);
      setTeamMembers(res.data.teamMembers);
      setFilteredMembers(res.data.teamMembers);
    } catch (err) {
      console.error("Error fetching team members:", err);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = teamMembers.filter(member =>
      member.name.toLowerCase().includes(value) ||
      member.email.toLowerCase().includes(value)
    );
    setFilteredMembers(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        await axios.delete(`/teammember/deleteteammember/${id}`);
        fetchTeamMembers();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleViewProfile = async (id) => {
    try {
      const res = await axios.get(`/teammember/profile/${id}`);
      setSelectedProfile(res.data);
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  const handleEdit = (member) => {
    setEditingId(member._id);
    setEditFormData({ name: member.name, email: member.email });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({ name: '', email: '' });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`/teammember/updateteammember/${id}`, editFormData);
      fetchTeamMembers();
      handleCancelEdit();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return (
    <div className="container">
      <h1 className="heading">👥 Team Member Profiles</h1>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="profile-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member._id}>
                <td>
                  {editingId === member._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditInputChange}
                      className="input-field"
                    />
                  ) : (
                    <span className="icon-text"><User size={16} />{member.name}</span>
                  )}
                </td>
                <td>
                  {editingId === member._id ? (
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditInputChange}
                      className="input-field"
                    />
                  ) : (
                    <span className="icon-text"><Mail size={16} />{member.email}</span>
                  )}
                </td>
                <td>
                  <span className="icon-text"><Briefcase size={16} />{member.role}</span>
                </td>
                <td className="action-buttons">
                  {editingId === member._id ? (
                    <>
                      <button onClick={() => handleUpdate(member._id)} className="btn btn-green">
                        <Check size={16} />
                      </button>
                      <button onClick={handleCancelEdit} className="btn btn-gray">
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleViewProfile(member._id)} className="btn btn-blue">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleEdit(member)} className="btn btn-yellow">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(member._id)} className="btn btn-red">
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {filteredMembers.length === 0 && (
              <tr>
                <td colSpan="4" className="no-data">No team members found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Profile Card */}
      {selectedProfile && (
        <div className="profile-card">
          <h2 className="card-heading">📋 Team Member Profile</h2>
          <table className="profile-info-table">
            <tbody>
              <tr>
                <td>👤 Name</td>
                <td>{selectedProfile.name}</td>
              </tr>
              <tr>
                <td>📧 Email</td>
                <td>{selectedProfile.email}</td>
              </tr>
              <tr>
                <td>🎯 Role</td>
                <td>{selectedProfile.role}</td>
              </tr>
              <tr>
                <td>📁 Projects Assigned</td>
                <td>{selectedProfile.projectsCount}</td>
              </tr>
              <tr>
                <td>📝 Tasks Assigned</td>
                <td>{selectedProfile.assignedTasks}</td>
              </tr>
              <tr>
                <td>✅ Tasks Completed</td>
                <td>{selectedProfile.completedTasks}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
