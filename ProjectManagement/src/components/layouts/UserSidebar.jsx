{/*import React, { useState } from 'react'
import { UserNavbar } from './UserNavbar'
import { Link, Outlet } from 'react-router-dom'

export const UserSidebar = () => {
  
  return (
   <>
   <UserNavbar />
   <aside
        className="app-sidebar bg-body-secondary shadow"
        data-bs-theme="dark"
      >
        <div className="sidebar-brand">
              <a href="./index.html" className="brand-link">
            <img
              src="../../dist/assets/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              className="brand-image opacity-75 shadow"
            />
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
                <Link to="userDashbord" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    Dashboard
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="userprofile" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>UserProfile</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="myTasks" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>My Tasks</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="uploadWork" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>UploadWork</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="myReport" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>My Report</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="cooment" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Comments</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="./generate/theme.html" className="nav-link">
                  <i className="nav-icon bi bi-palette" />
                  <p>Theme Generate</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    Widgets
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </a>
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
}     */}

import React, { useState } from "react";
import { UserNavbar } from "./UserNavbar";
import { Link, Outlet } from "react-router-dom";

export const UserSidebar = () => {
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
          <span className="fs-5">AdminLTE 4</span>
        </div>
        <nav>
          <ul className="nav flex-column">
          <li className="nav-item">
              <Link to="userDashbord" className="nav-link text-white">
                <i className="bi bi-speedometer me-2" />
                Dashbord
              </Link>
            </li>
            <li className="nav-item">
              <Link to="myTasks" className="nav-link text-white">
                <i className="bi bi-speedometer me-2" />
                My Tasks
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="myReport" className="nav-link text-white">
                <i className="bi bi-speedometer me-2" />
                Reports
              </Link>
            </li>            
          <li className="nav-item">
              <Link to="userProject" className="nav-link text-white">
                <i className="bi bi-speedometer me-2" />
                User Project
              </Link>
            </li>            
              <li className="nav-item">
              <Link to="helpandSupport" className="nav-link text-white ms-3">
              <i className="bi bi-circle me-2" />
              Help&Support
            </Link>
            </li>
            
           
            <li className="nav-item">
              <Link to="logout" className="nav-link text-white">
                <i className="bi bi-palette me-2" />
                logout
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