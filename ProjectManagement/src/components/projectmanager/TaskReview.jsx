import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle, XCircle, FileText } from 'lucide-react';

import '../../assets/TaskReview.css'

const TaskReview = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    axios.get('/task/all')
      .then(res => setCompletedTasks(res.data))
      .catch(() => toast.error('Failed to fetch completed tasks'));
  }, []);

  const handleApprove = async (taskId, taskName, userName) => {
    try {
      await axios.post(`/task/uploadWork/${taskId}`);
      toast.success(`✅ Approved "${taskName}" for ${userName} (ID: ${taskId})`);
      console.log(`Task Approved: "${taskName}" for ${userName} (ID: ${taskId})`);
      setCompletedTasks(prev => prev.filter(task => task._id !== taskId));
    } catch {
      toast.error(`❌ Failed to approve task: ${taskName}`);
    }
  };

  const handleRequestChanges = async (taskId, taskName, userName, comment) => {
    try {
      await axios.post(`/task/comment/${taskId}`, { comment });
      toast.info(`🔁 Requested changes on "${taskName}" for ${userName} (ID: ${taskId})`);
      setCompletedTasks(prev => prev.filter(task => task._id !== taskId));
    } catch {
      toast.error(`❌ Could not request changes for ${taskName}`);
    }
  };

  return (
    <div className="task-review-container">
      <h2 className="task-review-heading">📝 Task Review & Approvals</h2>

      {completedTasks.length === 0 ? (
        <p className="no-tasks">No completed tasks to review.</p>
      ) : (
        completedTasks.map(task => (
          <div key={task._id} className="task-card">
            <div className="task-header">
              <div>
                <h3 className="task-title">{task.taskName}</h3>
                <p className="task-user">Submitted by: <strong>{task.assignedTo?.fullName}</strong></p>
                <p className="task-id">Task ID: {task._id}</p>
              </div>
              <a
                href={task.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="task-preview-link"
              >
                <FileText className="icon" /> Preview
              </a>
            </div>

            <p className="task-description">
              <span className="desc-label">Description:</span> {task.description}
            </p>

            <div className="task-buttons">
              <button
                className="approve-btn"
                onClick={() => handleApprove(task._id, task.taskName, task.assignedTo?.fullName || "Unknown")}
              >
                <CheckCircle className="icon" /> Approve
              </button>

              <button
                className="reject-btn"
                onClick={() =>
                  handleRequestChanges(
                    task._id,
                    task.taskName,
                    task.assignedTo?.fullName || "Unknown",
                    prompt("Enter comment for requested changes:")
                  )
                }
              >
                <XCircle className="icon" /> Request Changes
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskReview;
