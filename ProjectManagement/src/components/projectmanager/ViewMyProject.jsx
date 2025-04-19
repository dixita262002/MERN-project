import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ViewMyProject = () => {
  const [screens, setscreens] = useState([]);

  const getAllMyProjectScreens = async () => {
    try {
      const res = await axios.get('/project/allprojects');
      setscreens(res.data.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    getAllMyProjectScreens();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h2 style={{ marginBottom: '30px' }}>View My Project</h2>

      <table className="table table-bordered table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {screens?.map((sc) => (
            <tr key={sc._id}>
              <td>{sc.title}</td>
              <td>{sc.description}</td>
              <td>
                <img
                  src={sc?.imageURL}
                  alt="Project"
                  style={{ height: '200px', width: '200px', objectFit: 'cover' }}
                />
              </td>
              <td>
                <Link
                  to={`/projectmanager/updatemyproject/${sc._id}`}
                  className="btn btn-info"
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewMyProject;
