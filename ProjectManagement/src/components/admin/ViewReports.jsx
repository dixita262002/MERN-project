export const ViewReports = () => {
  return (
    <div className="view-reports">
      <h1>View Reports</h1>
      <table>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Report Name</th>
            <th>Date Generated</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>301</td>
            <td>Monthly Progress Report</td>
            <td>2025-03-25</td>
            <td>Completed</td>
            <td><button>View</button> <button>Download</button></td>
          </tr>
          <tr>
            <td>302</td>
            <td>Project Performance Analysis</td>
            <td>2025-03-20</td>
            <td>Completed</td>
            <td><button>View</button> <button>Download</button></td>
          </tr>
          <tr>
            <td>303</td>
            <td>Task Completion Overview</td>
            <td>2025-03-18</td>
            <td>Pending</td>
            <td><button>View</button> <button>Download</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
