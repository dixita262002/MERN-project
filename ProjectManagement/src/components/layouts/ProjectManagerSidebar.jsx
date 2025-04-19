/*import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ProjectManagerNavbar } from './ProjectManagerNavbar'

export const ProjectManagerSidebar = () => {
  return (
   
   <>
   <ProjectManagerNavbar></ProjectManagerNavbar>
   <aside
        className="app-sidebar bg-body-secondary shadow"
        data-bs-theme="dark"
      >      
        <div
          className=""
          data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
          tabIndex={-1}
          style={{
            color:'pink',
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
                <Link to="PMdashbord" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    Dashboard
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                <li className="nav-item">
                    <Link to="myprojects" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>My Projects</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="managetasks" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Manage Tasks</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="milestone" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Milestone</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="projectscreen" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>View MyProject</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="teammanagement" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Team Management</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="PMSettings" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Settings </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="task" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Tasks</p>
                    </Link>
                  </li>
                </ul>
              </li>
              {/*<li className="nav-item">
                <Link to="users" className="nav-link">
                  <i className="nav-icon bi bi-palette" />
                  <p>Users</p>
                </Link>
              </li>*/
             /* <li className="nav-item">
                <Link to="Report" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    Reports
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
  */
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ProjectManagerNavbar } from "./ProjectManagerNavbar";

export const ProjectManagerSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <div
        className={`bg-dark text-white p-3 sidebar shadow ${isSidebarOpen ? "d-block" : "d-none"}`}
        style={{ width: "250px", transition: "0.3s" }}
      >
        <div className="mb-4">
          <img
            src="../../src/assets/landing/images/about-dots.png" // Replace with your actual logo
            alt="Logo"
            className="img-fluid mb-2"
            style={{ height: "40px" }}
          />
          <span className="fs-5">Project Manager</span>
        </div>
        <nav>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="PMdashbord" className="nav-link text-white">
                <i className="bi bi-speedometer me-2" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="myprojects" className="nav-link text-white ms-3">
                <i className="bi bi-circle me-2" />
                My Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link to="managetasks" className="nav-link text-white ms-3">
                <i className="bi bi-circle me-2" />
                Manage Tasks
              </Link>
            </li>
          
            <li className="nav-item">
              <Link to="projectscreen" className="nav-link text-white ms-3">
                <i className="bi bi-circle me-2" />
                View My Project
              </Link>
            </li>
            {/*<li className="nav-item">
              <Link to="taskview" className="nav-link text-white ms-3">
                <i className="bi bi-gear me-2" />
             taskview
              </Link>
            </li>*/}
            <li className="nav-item">
              <Link to="assignTeam" className="nav-link text-white ms-3">
                <i className="bi bi-gear me-2" />
                AssignTeam
              </Link>
            </li>
            <li className="nav-item">
              <Link to="PMSettings" className="nav-link text-white ms-3">
                <i className="bi bi-gear me-2" />
                Settings
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="logout" className="nav-link text-white ms-3">
                <i className="bi bi-gear me-2" />
                LogOute
              </Link>
            </li>
            
            
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column">
        <ProjectManagerNavbar toggleSidebar={toggleSidebar} />
        <main className="p-3 overflow-auto" style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
