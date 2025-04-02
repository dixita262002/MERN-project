import React from 'react'
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
        </div>*/}
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
                {/*<Link to="adminprofile" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    AdminProfile
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>*/}
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="dashborda1" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Dashboard A1</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="manageuser" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Manage User</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="viewproject" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>View & Manage Project</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="Managemoduleandtask" className="nav-link">
                  <i className="nav-icon bi bi-palette" />
                  <p>Manage Module&Tasks</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="viewreport" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    View Reports
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                
              </li>
              <li className="nav-item">
                <Link to="systemsetting" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    System Setting
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