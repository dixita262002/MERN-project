
import React from 'react'

export const UserProfile = () => {

  return (
    <div className="team-profile">
      <h2 className="section-title">Team Profile</h2>

      {/* Project Details */}
      <div className="section">
        <h3>Project Details</h3>
        <table className="details-table">
          <tbody>
            <tr><td>College Name:</td><td>MERCHANT ENGINEERING COLLEGE, BASNA, VISNAGAR</td></tr>
            <tr><td>Discipline Code:</td><td>BE</td></tr>
            <tr><td>Semester:</td><td>8</td></tr>
            <tr><td>Department:</td><td>Computer Engineering</td></tr>
            <tr><td>Project Title:</td><td>Project Management</td></tr>
            <tr><td>Domain:</td><td>Web Development</td></tr>
            <tr><td>Organization:</td><td>GrowthLead Private Limited</td></tr>
            <tr><td>Project Keywords:</td><td>Node.js, Express.js, React.js, MongoDB</td></tr>
            <tr><td>Year:</td><td>2025</td></tr>
          </tbody>
        </table>
      </div>

      {/* External Guide Details */}
      <div className="section">
        <h3>External Guide Details</h3>
        <table className="details-table">
          <tbody>
            <tr><td>Name:</td><td>Rahul Kiplekar</td></tr>
            <tr><td>Organization:</td><td>GrowthLead Private Limited</td></tr>
            <tr><td>Email:</td><td>rk@growthlead.com</td></tr>
            <tr><td>Address:</td><td>Surthi Complex, Ahmedabad, Gujarat</td></tr>
          </tbody>
        </table>
      </div>

      {/* Team Details */}
      <div className="section">
        <h3>Team Details</h3>
        <table className="team-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Enrollment No.</th>
              <th>Name</th>
              <th>College</th>
              <th>Department</th>
              <th>Mobile No.</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>22063107015</td>
              <td>Patel Dixitaben Champaklal</td>
              <td>MERCHANT ENGINEERING COLLEGE</td>
              <td>Computer Engineering</td>
              <td>7908333744</td>
              <td>dixitapatel2020@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
