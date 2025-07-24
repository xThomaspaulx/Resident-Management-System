import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from './pages/Contact';
import Login from './pages/Login';
import About from './pages/About';
import MngRequest from './pages/MngRequest';
import History from './pages/History';
import SuperAdmin from './pages/SuperAdmin';
import ManageAdmins from './pages/ManageAdmins';
import ViewRequests from './pages/ViewRequests';
import ViewUsers from './pages/ViewUsers';
import ManageServices from './pages/ManageServices';
import ManageUsers from './pages/ManageUsers';


function App() {
  return (

      // <Header/>

      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/Request' element={<MngRequest/>}/>
            <Route path='/History' element={<History/>}/>
            
            <Route path="/SuperAdmin" element={<SuperAdmin/>} />
            <Route path="/ManageAdmins" element={<ManageAdmins />} />
            <Route path="/ViewRequests" element={<ViewRequests />} />
            <Route path="/ViewUsers" element={<ViewUsers/>} />
            <Route path="/ManageServices" element={<ManageServices/>} />
            <Route path="/ManageUsers" element={<ManageUsers/>} />
        </Routes>
      </BrowserRouter>
      
      
   )
}

export default App;


