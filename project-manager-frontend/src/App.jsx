import './App.css'
import {Routes,Route,Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Overview from './Components/Overview';
import Admindashbard from './Admin/Admindashboard';
import Allmember from './Admin/Allmember';
import Addproject from './Admin/Addproject';
import Allprojects from './Admin/Allprojects';
import Project from './Admin/Project';
import Adminoverview from './Admin/Adminoverview';
function App() {
  return(
    <div id="app">
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>} >
        <Route path='overview' element={<Overview></Overview>}></Route>
        </Route>
        
        <Route path='/admindashboard' element={<Admindashbard></Admindashbard>}>
        <Route path='addmember' element={<Allmember></Allmember>}></Route>
        <Route path='adminoverview' element={<Adminoverview></Adminoverview>}></Route>
        <Route path='all-projects' element={<Allprojects></Allprojects>}></Route>
        <Route path='project/:id' element={<Project></Project>}></Route>
        <Route path='addproject' element={<Addproject></Addproject>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
