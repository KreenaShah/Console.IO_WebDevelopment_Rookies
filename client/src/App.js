import './App.css';
import ClientRegister from './components/Client/ClientRegister';
import Login from './components/login/Login';
import Home from './components/Home/Home';
import Main from './components/Main/Main';
import ForgotPwMail from './components/PwReset/ForgotPwMail';
import ResetPw from './components/PwReset/ResetPw';
import WorkerProf from './components/Worker/WorkerProf';
import AddListing from './components/Listing/AddListing'
import AllListing from './components/Listing/AllListing';
import { Routes, Route, Navigate } from "react-router-dom";
import WorkerReg from './components/Worker/WorkerReg';
import MapWithRouting from './components/GMaps/Map';
import Admin from './components/Admin/Admin';
import Clients from './components/Admin/ClientsAdmin';
import Workers from './components/Admin/WorkersAdmin';
import LandingComponent from './components/Home/landing';
import VerificationTable from './components/Admin/VerificationAdmin';
import ClientProfile from './components/Client/clientProf';
import ClientQuery from './components/Client/clientQuery';
import OrdersTable from './components/Worker/Orders';
import ClientDetails from './components/Client/clientDetails';
import WorkerDetails from './components/Worker/workerDetails';
import AddAdminComponent from './components/Admin/AddAdmin';

function App() {
  const user = localStorage.getItem("secret_token");
  const isVerified=localStorage.getItem("isVerified");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingComponent />}></Route>
        <Route path="/register/worker" element={<WorkerReg />}></Route>
        <Route path="/register/client" element={<ClientRegister />}></Route>

        <Route path="/login" element={<Login />}></Route>

        <Route path="/password-reset" element={<ForgotPwMail />}></Route>
        <Route path="/pwReset" element={<ResetPw />}></Route>

        {user && <Route path="/worker/profile" element={<WorkerDetails />}></Route>}
        {user && <Route path="/worker/profile/edit" element={<WorkerProf />}></Route>}
        {user && isVerified && <Route path="/worker/orders" element={<OrdersTable />}></Route>}
        {user && isVerified && <Route path="/worker/notifications" element={<OrdersTable />}></Route>} {/* Left To Do */}

        {user && <Route path="/client/profile" element={<ClientDetails />}></Route>}
        {user && <Route path="/client/profile/edit" element={<ClientProfile />}></Route>}
        {user && <Route path="/client/rquery" element={<ClientQuery />}></Route>}
        {user && <Route path="/client/notifications" element={<ClientQuery />}></Route>} {/* Left To Do */}

        {user && <Route path="/admin/dashboard" element={<Admin />}></Route>}
        {user && <Route path="/admin/workers" element={<Clients />}></Route>}
        {user && <Route path="/admin/clients" element={<Workers />}></Route>}
        {user && <Route path="/admin/verification" element={<VerificationTable />}></Route>}
        {user && <Route path="/admin/addnewadmins" element={<AddAdminComponent />}></Route>}
        
        <Route path='/map' element={<MapWithRouting />}></Route>
      </Routes>
    </div>
  );
}

export default App;
