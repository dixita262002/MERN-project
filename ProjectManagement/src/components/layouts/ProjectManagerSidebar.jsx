
import React from 'react'
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
       <div style={{textAlign:"center"}}>
           <h3> <span className="brand-text fw-light">Manage Projects</span>
    </h3>
        </div>
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
                <Link to="dashbordm1" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    DashboardM1
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
                {/*  <li className="nav-item">
                    <Link to="myprojects" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>My Projects</p>
                    </Link>
                  </li>*/}
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
                  {/*<li className="nav-item">
                    <Link to="mymodules" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>My Modules</p>
                    </Link>
                  </li>*/}
                  {/*<li className="nav-item">
                    <Link to="tasks" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Tasks</p>
                    </Link>
                  </li>*/}
                </ul>
              </li>
              {/*<li className="nav-item">
                <Link to="users" className="nav-link">
                  <i className="nav-icon bi bi-palette" />
                  <p>Users</p>
                </Link>
              </li>*/}
              <li className="nav-item">
                <Link to="reports" className="nav-link">
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