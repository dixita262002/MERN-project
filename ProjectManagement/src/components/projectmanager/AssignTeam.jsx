import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/AssignTeams.css'

export const AssignTeam = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'Active',
    projectId: ''
  });

  const roles = [ 'User', 'Developer', 'Designer', 'Tester', ];
  const statuses = ['Active', 'Inactive'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/project/allprojects');
        setProjects(res.data.data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/teammember/createteammember', formData);
      alert('Team Member Added Successfully!');
      setFormData({ name: '', email: '', role: '', status: 'Active', projectId: '' });
    } catch (error) {
      console.error('Error adding team member:', error);
      alert('Error adding team member!');
    }
  };

  return (
    <div className="assignteam-container">
      <h2 className="assignteam-title">Add New Team Member</h2>
      <form onSubmit={handleSubmit} className="assignteam-form">
        <div className="form-group">
          <label>Select Project</label>
          <select name="projectId" value={formData.projectId} onChange={handleChange} required>
            <option value="">-- Select Project --</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">-- Select Role --</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit">Add Team Member</button>
        </div>
      </form>
    </div>
  );
};

export default AssignTeam;
