import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

//import './App.css'
import './assets/adminlte.css'
import './assets/adminlte.min.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Login } from './components/common/Login'
import { Signup } from './components/common/Signup'
import { UserSidebar } from './components/layouts/UserSidebar'
import { UserProfile } from './components/user/UserProfile'
import { AdminSidebar } from './components/layouts/AdminSidebar'
import axios from 'axios'
import { AdminProfile } from './components/admin/AdminProfile'
import LandingPage from './components/common/LandingPage'
import { ProjectManagerSidebar } from './components/layouts/ProjectManagerSidebar'
import { Dashboard } from './components/projectmanager/Dashboard'
import { MyProjects } from './components/projectmanager/MyProjects'
import { MyModules } from './components/projectmanager/MyModules'
//import { Tasks } from './components/projectmanager/Tasks'
import { Reports } from './components/projectmanager/Reports'
import PrivateRoutes from './hooks/PrivateRoutes'
import { ViewMyProject } from './components/projectmanager/ViewMyProject'
import { UpdateMyProject } from './components/projectmanager/UpdateMyProject'
import { DashbordA1 } from './components/admin/DashbordA1'
import { ManageUser } from './components/admin/ManageUser'
import { ViewAndManageProject } from './components/admin/ViewAndManageProject'
import { ManageModulesAndTasks } from './components/admin/ManageModulesAndTasks'
import { ViewReports } from './components/admin/ViewReports'
import { SystemSetting } from './components/admin/SystemSetting'
import { ManageTask } from './components/projectmanager/ManageTask'
import { DashboardM1 } from './components/projectmanager/DashboardM1'
import { TeamManagement } from './components/projectmanager/TeamManagement'

function App() {
 // axios.defaults.baseURL = "http://localhost:3000";
 axios.defaults.baseURL = "http://localhost:3000";

  const location = useLocation();

  useEffect(()=>{
    if(location.pathname === "/login" || location.pathname ==="/signup"){
      document.body.className = "";  //[[remmove the unwanted cass login and signup]
    }else{
      document.body.className = 
      "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);

  return (
    
    <div className={location.pathname === "/login" || location.pathname === "/signup" ? "" : "app-wrapper"}>
      
    
    
        {/*<UserSidebar></UserSidebar>*/}

         <Routes>
        
         <Route path='/login'element = {<Login/>}></Route>
         <Route path='/signup' element = {<Signup/>}></Route>
         <Route path='/' element = {<LandingPage/>}></Route>

         {/*<Route element = {<PrivateRoutes/>}/>*/}
           <Route path='/user' element = {<UserSidebar/>}>
           <Route path='userprofile' element = {<UserProfile/>}></Route>
           </Route>
           <Route path='/admin' element = {<AdminSidebar/>}>
           {/*<Route path='adminprofile' element = {<AdminProfile/>}></Route>*/}
           <Route path='dashborda1' element = {<DashbordA1/>}></Route>
           <Route path='manageuser' element = {<ManageUser/>}></Route>
           <Route path='viewproject' element = {<ViewAndManageProject/>}></Route>
           <Route path='Managemoduleandtask' element = {<ManageModulesAndTasks/>}></Route>
           <Route path='viewreport' element = {<ViewReports/>}></Route>
           <Route path='systemsetting' element = {<SystemSetting/>}></Route>
           </Route>
           
           
           <Route path='/projectmanager' element = {<ProjectManagerSidebar/>}>
           {/*<Route path='dashboard' element = {<Dashboard/>}></Route>*/}
           <Route path='dashbordm1' element = {<DashboardM1/>}></Route>
           <Route path='myprojects' element = {<MyProjects/>}/>
           <Route path='projectscreen' element = {<ViewMyProject/>}></Route>
           <Route path='updatemyproject/:id' element = {<UpdateMyProject/>}></Route>
           
           {/*<Route path='mymodules' element = {<MyModules/>}></Route>*/}
           {/*<Route path='tasks' element = {<Tasks/>}></Route>*/}
           <Route path='managetasks' element = {<ManageTask/>}></Route>
           <Route path='teammanagement' element = {<TeamManagement/>}></Route>
           <Route path='reports' element = {<Reports/>}></Route>

           </Route>
          
         </Routes>
      
    
  </div>

  )
}

export default App

