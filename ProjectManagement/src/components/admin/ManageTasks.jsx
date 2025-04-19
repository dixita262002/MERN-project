import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaProjectDiagram, FaTasks, FaRegCalendarAlt, FaAlignLeft } from 'react-icons/fa';
//import './ManageTasks.css'; // Import the CSS file
import '../../assets/ManageTasks.css'
const ManageTasks = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/users');
        setUsers(res.data.data || []);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  // Fetch projects for selected user
  useEffect(() => {
    const fetchProjects = async () => {
      if (!selectedUserId) return;
      try {
        const res = await axios.get(`/project/projectbyuser/${selectedUserId}`);
        setProjects(res.data.data || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, [selectedUserId]);

  const onSubmit = async (data) => {
    const taskData = {
      taskName: data.taskName,
      description: data.description,
      status: 'Pending',
      assignedTo: selectedUserId,
      projectId: selectedProjectId,
      startDate: data.startDate,
      dueDate: data.dueDate,
    };

    try {
      await axios.post('/task/addtask', taskData);
      toast.success('✅ Task successfully assigned!');
      reset();
      setShowModal(false);
      setSelectedProjectId('');
    } catch (err) {
      console.error('Error adding task:', err);
      toast.error('❌ Failed to assign task.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <ToastContainer />
      <button
        className="button"
        onClick={() => setShowModal(true)}
      >
        Assign Task
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-4 text-center">Assign Task</h2>

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="modal-close"
            >
              ×
            </button>

            {/* Select User */}
            <div className="form-group">
              <label>Select User</label>
              <div className="flex items-center border px-2 py-2 rounded">
                <FaUser className="text-gray-500 mr-2" />
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                >
                  <option value="">-- Select User --</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.fullName} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Select Project */}
            {selectedUserId && (
              <div className="form-group">
                <label>Select Project</label>
                <div className="flex items-center border px-2 py-2 rounded">
                  <FaProjectDiagram className="text-gray-500 mr-2" />
                  <select
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                  >
                    <option value="">-- Select Project --</option>
                    {projects.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Task Form */}
            {selectedProjectId && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-group">
                  <label>Task Title</label>
                  <div className="flex items-center border px-3 py-2 rounded">
                    <FaTasks className="text-gray-500 mr-2" />
                    <input
                      type="text"
                      {...register('taskName', { required: 'Task Title is required' })}
                      placeholder="Enter task title"
                    />
                  </div>
                  {errors.taskName && <p className="input-error">{errors.taskName.message}</p>}
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <div className="flex items-start border px-3 py-2 rounded">
                    <FaAlignLeft className="text-gray-500 mr-2 mt-1" />
                    <textarea
                      {...register('description', { required: 'Description is required' })}
                      placeholder="Enter task description"
                    />
                  </div>
                  {errors.description && <p className="input-error">{errors.description.message}</p>}
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label>Start Date</label>
                    <div className="flex items-center border px-3 py-2 rounded">
                      <FaRegCalendarAlt className="text-gray-500 mr-2" />
                      <input
                        type="date"
                        {...register('startDate', { required: 'Start Date is required' })}
                      />
                    </div>
                    {errors.startDate && <p className="input-error">{errors.startDate.message}</p>}
                  </div>

                  <div className="flex-1">
                    <label>Due Date</label>
                    <div className="flex items-center border px-3 py-2 rounded">
                      <FaRegCalendarAlt className="text-gray-500 mr-2" />
                      <input
                        type="date"
                        {...register('dueDate', { required: 'Due Date is required' })}
                      />
                    </div>
                    {errors.dueDate && <p className="input-error">{errors.dueDate.message}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="button"
                >
                  Assign Task
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTasks;
