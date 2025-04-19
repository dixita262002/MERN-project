/*import React from 'react'
import { UserNavbar } from './UserNavbar'
import { Link, Outlet } from 'react-router-dom'

export const AdminSidebar = () => {
  return (    
   <>
   <UserNavbar></UserNavbar>
   
   <aside
        className="app-sidebar bg-body-secondary shadow"
        data-bs-theme="dark"
      >
       {/* <div className="sidebar-brand">
              <a href="./index.html" className="brand-link">
            <img
              src="../../dist/assets/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              className="brand-image opacity-75 shadow"
            />
            <span className="brand-text fw-light">AdminLTE 4</span>
          </a>  
        </div>*/
        /*<div
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
               {/*<li className="nav-item">
                <Link to="AdminDashbord" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    Dashbord
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                
              </li>
              <li className="nav-item menu-open">
                <Link to="addProject" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    AddProject
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  {/*<li className="nav-item">
                    <Link to="dashborda1" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Dashboard A1</p>
                    </Link>
                  </li>*/
                 /* <li className="nav-item">
                    <Link to="manageUsers" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>ManageUses</p>
                    </Link>
                  </li>
                  {/*<li className="nav-item">
                    <Link to="AdminProject" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>AdminProject</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="Report" className="nav-link">
                  <i className="nav-icon bi bi-palette" />
                  <p>Report</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="AdminSettings" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    AdminSetting
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                
              </li>*/
              /*<li className="nav-item">
                <Link to="adduser" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                     Add User
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                
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
import { UserNavbar } from "./UserNavbar";
import { Link, Outlet } from "react-router-dom";

export const AdminSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <div
        className={`bg-dark text-white p-3 sidebar shadow ${
          isSidebarOpen ? "d-block" : "d-none"
        }`}
        style={{ width: "250px", transition: "0.3s" }}
      >
        <div className="mb-4">
          {/*<img
            src="../../dist/assets/img/AdminLTELogo.png"
            alt="Logo"
            className="img-fluid mb-2"
            style={{ height: "40px" }}
          />*/}
          <span className="fs-5">Admin</span>
        </div>
        <nav>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="AdminDashbord" className="nav-link text-white">
                <i className="bi bi-speedometer me-2" />
                Dashboard
              </Link>
            </li>
            {/*<li className="nav-item">
              <Link to="addproject" className="nav-link text-white ms-3">
                <i className="bi bi-circle me-2" />
                Add Project
              </Link>
            </li>*/}
            <li className="nav-item">
              <Link to="manageusers" className="nav-link text-white ms-3">
                <i className="bi bi-circle me-2" />
                Manage Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="manageProject" className="nav-link text-white ms-3">
                <i className="bi bi-circle me-2" />
                Manage Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link to="ManageTasks" className="nav-link text-white">
                <i className="bi bi-gear me-2" />
                ManageTasks
              </Link>
            </li>
            <li className="nav-item">
              <Link to="TaskProjectView" className="nav-link text-white">
                <i className="bi bi-person-plus me-2" />
                TaskProjectView
              </Link>
              </li>
            {/*<li className="nav-item">
              <Link to="AdminSettings" className="nav-link text-white">
                <i className="bi bi-person-plus me-2" />
                Settings 
              </Link>
            </li>*/}
            <li className="nav-item">
              <Link to="logout" className="nav-link text-white">
                <i className="bi bi-person-plus me-2" />
                LogOut 
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column">
        <UserNavbar toggleSidebar={toggleSidebar} />
        <main className="p-3 overflow-auto" style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

