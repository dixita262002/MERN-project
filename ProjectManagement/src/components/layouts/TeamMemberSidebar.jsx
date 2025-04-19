import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { TeamMemberNavbar } from './TeamMemberNavbar';

export const TeamMemberSidebar = () => {
 
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setSidebarOpen(!isSidebarOpen);
  };
  return (
   <>
   <TeamMemberNavbar toggleSidebar={toggleSidebar} />
   <aside
        className="app-sidebar bg-body-secondary shadow"
        data-bs-theme="dark"
      >
        <div className="sidebar-brand">
              <a href="./index.html" className="brand-link">
            
            <span className="brand-text fw-light">AdminLTE 4</span>
          </a>  
        </div>
        <div
          className=""
          data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
          tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8,
          }}
        >
          <nav className="mt-2">
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <Link to="dashbord" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    TMDashboard
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                {/*  <li className="nav-item">
                    <Link to="" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p></p>
                    </Link>
                  </li>*/}
                  <li className="nav-item">
                    <Link to="teamMembersProfile" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>MEMBERS PROFILE</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="assignedTasks" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>ASSIGNED TASKS</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="helpsupport" className="nav-link">
                  <i className="nav-icon bi bi-palette" />
                  <p>HELP&SUPPORT</p>
                </Link>
              </li>
              <li className="nav-item">
             {/* <Link to="notification" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    Notification
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>*/}
                <Link to="logout" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    LogOut
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                <Link to="tMSettings" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    Settings
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                <Link to="Reports" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    Reaport
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="./widgets/small-box.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Small Box</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./widgets/info-box.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>info Box</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./widgets/cards.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Cards</p>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>  
          </nav>
        </div>
      </aside>
      <main class="app-main">
        <Outlet></Outlet>
      </main>
   </>
  )
} 




















  {/*import React, { useState } from 'react';
  import { Link, Outlet } from 'react-router-dom';
  import { TeamMemberNavbar } from './TeamMemberNavbar';
  
  export const TeamMemberSidebar = ({ member = {} }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
  
    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };
  
    return (
      <>
        <TeamMemberNavbar toggleSidebar={toggleSidebar} />
        <aside
          className={`app-sidebar bg-body-secondary shadow ${
            isSidebarOpen ? 'open' : 'closed'
          }`}
          data-bs-theme="dark"
        >
          {/* Sidebar Brand */
         /* <div className="sidebar-brand">
            <a href="/" className="brand-link">
              <span className="brand-text fw-light">AdminLTE 4</span>
            </a>
          </div>
  
          {/* Sidebar User Panel */
          /*<div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={member?.profilePicture || '/default-profile.png'}
                alt={`${member?.name || 'User'}'s profile`}
                className="img-circle elevation-2"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">{member?.name || 'No Name'}</a>
              <p className="text-muted">{member?.role || 'No Role'}</p>
            </div>
          </div>
  
          {/* Sidebar Navigation */
         /* <nav className="mt-2">
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/dashbord" className="nav-link">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>Dashboard</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/userprofile" className="nav-link">
                  <i className="nav-icon bi bi-person" />
                  <p>User Profile</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="assignedTasks" className="nav-link">
                  <i className="nav-icon bi bi-list-check" />
                  <p>Assigned Tasks</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="helpsupport" className="nav-link">
                  <i className="nav-icon bi bi-question-circle" />
                  <p>Help & Support</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="logout" className="nav-link">
                  <i className="nav-icon bi bi-box-arrow-right" />
                  <p>Logout</p>
                </Link>
              </li>
            </ul>
          </nav>
  
          {/* Tasks Overview */}
         /* {member?.tasks?.length > 0 && (
            <div className="mt-4 p-3">
              <h5>Tasks Overview</h5>
              <ul className="list-unstyled">
                {member.tasks.map((task) => (
                  <li key={task.id} className="mb-2">
                    <p className="mb-0">
                      {task.title}
                      <span
                        className={`badge ms-2 ${
                          task.status === 'Completed'
                            ? 'bg-success'
                            : task.status === 'In Progress'
                            ? 'bg-warning'
                            : 'bg-secondary'
                        }`}
                      >
                        {task.status}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
  
          {/* Last Update */
          /*{member?.lastUpdate && (
            <div className="sidebar-footer p-3">
              <p className="text-muted text-sm">
                Last Update: {new Date(member.lastUpdate).toLocaleDateString()}
              </p>
            </div>
          )}
        </aside>
  
        <main className="app-main">
          <Outlet />
        </main>
      </>
    );
  };
  */