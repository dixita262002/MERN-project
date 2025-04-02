import React from 'react'

export const ManageModulesAndTasks = () => {
 
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const tasks = [
    { id: 201, name: "Database Setup", assignedTo: "John Doe", status: "Ongoing" },
    { id: 202, name: "Frontend UI Design", assignedTo: "Alice Smith", status: "Completed" },
    { id: 203, name: "API Integration", assignedTo: "David Johnson", status: "Pending" }
  ];

  const filteredTasks = tasks.filter(task => 
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === "" || task.status === statusFilter)
  );

  return (
    <div className="manage-tasks">
      <h1>Manage Modules & Tasks</h1>
      <button>Add New Task</button>
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search tasks..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>
                <button>Edit</button> 
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
