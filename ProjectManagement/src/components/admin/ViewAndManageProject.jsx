import React from 'react'

export const ViewAndManageProject = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  //const projects = [
    //{ id: 101, name: "Website Redesign", manager: "John Doe", status: "Ongoing" },
    //{ id: 102, name: "Mobile App", manager: "Alice Smith", status: "Completed" },
    //{ id: 103, name: "E-commerce Platform", manager: "David Johnson", status: "Pending" }
  //];

  //const filteredProjects = projects.filter(project => 
    //project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    //(statusFilter === "" || project.status === statusFilter)
  //);

  return (
    <div className="manage-projects">
      <h1>Manage Projects</h1>
      <button>Add New Project</button>
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search projects..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          {/*<option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>*/}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Project Name</th>
            <th>Manager</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map(project => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.manager}</td>
              <td>{project.status}</td>
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
