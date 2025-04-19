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
import axios from 'axios'
import LandingPage from './components/common/LandingPage'
import { ProjectManagerSidebar } from './components/layouts/ProjectManagerSidebar'
import { MyProjects } from './components/projectmanager/MyProjects'
//import { Tasks } from './components/projectmanager/Tasks'
import PrivateRoutes from './hooks/PrivateRoutes'
import { ViewMyProject } from './components/projectmanager/ViewMyProject'
import { TeamManagement } from './components/projectmanager/TeamManagement'
import { UpdateMyProject } from './components/projectmanager/UpdateMyProject'
import { TeamMemberSidebar } from './components/layouts/TeamMemberSidebar'
import { LogOut } from './components/TeamMember/LogOut'
import AssignedTasks from './components/TeamMember/AssignedTasks'
import { TeamMembersProfile } from './components/TeamMember/TeamMembersProfile'
import { HelpSupport } from './components/TeamMember/HelpSupport'
import { Notifications } from './components/TeamMember/Notifications'
import { Reports } from './components/TeamMember/Reports'
import { TMDashboard } from './components/TeamMember/TMDashbord'
import { Dashboard } from './components/projectmanager/Dashboard'
import { Report } from './components/projectmanager/Report'
import { PMSettings } from './components/projectmanager/PMSettings'
import ManageUsers from './components/admin/ManageUsers'
import AMReport from './components/admin/AMReport'
import AdminDashboard from './components/admin/AdminDashbord'
import { TeamMemberSettings } from './components/TeamMember/TeamMemberSettings'
import { ManageProjects } from './components/admin/ManageProjects'
import ManageTasks from './components/admin/ManageTasks'
import ManageTask from './components/projectmanager/ManageTask'
import { AdminSidebar } from './components/layouts/AdminSidebar'
import AdminTaskProjectView from './components/admin/AdminTaskProjectView'
import MyTasks from './components/user/MyTasks'
import AssignTeam from './components/projectmanager/AssignTeam'
import TaskReview from './components/projectmanager/TaskReview'
import UserNotificationsSettings from './components/projectmanager/UserNotificationsSettings'
import { MyReports } from './components/user/MyReports'
import UserProjects from './components/user/UserProjects'
import { HelpAndSupport } from './components/user/HelpAndSupport'
import UserDashboard from './components/user/UserDashboard'
import { ResetPassword } from './components/common/ResetPassword'
import { UserTeam } from './components/user/UserTeam'




function App() {
 // axios.defaults.baseURL = "http://localhost:4000";
 axios.defaults.baseURL = "http://localhost:4000";

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
         <Route path='/resetpassword/:token' element = {<ResetPassword/>}></Route>


         {/*<Route element = {<PrivateRoutes/>}/>*/}
           <Route path='/user' element = {<UserSidebar/>}> 
           <Route index element = {<UserDashboard/>}></Route>
           {/*<Route index element = {<Dashboard/>}></Route>*/}
           <Route path='userDashbord' element = {<UserDashboard/>}></Route>
           <Route path='myTasks' element = {<MyTasks/>}></Route>
           <Route path='userProject' element = {<UserProjects/>}></Route>
           <Route path='userteam' element = {<UserTeam/>}></Route>
           <Route path='helpandSupport' element = {<HelpAndSupport/>}></Route>          
           <Route path='myReport' element = {<MyReports/>}></Route>
           {/*<Route path='userProfile' element = {<UserProfile/>}></Route>*/}
           <Route path='logout' element = {<LogOut/>}></Route>
           </Route>
                    
           <Route path='/admin' element = {<AdminSidebar/>}>
           <Route index element = {<AdminDashboard/>}></Route>
           <Route path='AdminDashbord' element = {<AdminDashboard/>}></Route>
           <Route path='manageUsers' element = {<ManageUsers/>}></Route>
           <Route path='manageProject' element = {<ManageProjects/>}></Route>
           <Route path='ManageTasks' element = {<ManageTasks/>}></Route>
           <Route path='Report' element = {<AMReport/>}></Route>
           {/*<Route path='AdminSettings' element = {<AdminSettings/>}></Route>*/}
           <Route path='TaskProjectView' element = {<AdminTaskProjectView/>}></Route>
           <Route path='logout' element = {<LogOut/>}></Route>           
           </Route>
                      
           <Route path='/projectmanager' element = {<ProjectManagerSidebar/>}>
           <Route index element = {<Dashboard/>}></Route>
           <Route path='PMdashbord' element = {<Dashboard/>}></Route>          
           <Route path='myprojects' element = {<MyProjects/>}></Route>
           <Route path='projectscreen' element = {<ViewMyProject/>}></Route>
           <Route path='updatemyproject/:id' element = {<UpdateMyProject/>}></Route>
           <Route path='managetasks' element = {<ManageTask/>}></Route>
           <Route path='taskview' element = {<TaskReview/>}></Route>
           <Route path='assignTeam' element = {<AssignTeam/>}></Route>
           <Route path='Setting' element = {<UserNotificationsSettings/>}></Route>
           <Route path='PMSettings' element = {<PMSettings/>}></Route>
           <Route path='logout' element = {<LogOut/>}></Route>
           

           </Route>
           <Route path='/tmembers' element = {<TeamMemberSidebar/>}>
           {/*<Route path='/' element = {<WelcomePage/>}/>*/}
           <Route path='dashbord' element = {<TMDashboard/>}></Route>
           <Route path='assignedTasks' element = {<AssignedTasks/>}></Route>
           <Route path='helpsupport' element = {<HelpSupport/>}></Route>
           <Route path='teamMembersProfile' element = {<TeamMembersProfile/>}></Route>
           <Route path='logout' element = {<LogOut/>}></Route>
           <Route path='notification' element = {<Notifications/>}></Route>
           <Route path='tMSettings' element = {<TeamMemberSettings/>}></Route>
           <Route path='Reports' element = {<Reports/>}></Route>
           </Route>
          
         </Routes>
      
    
  </div>

  )
}

export default App

