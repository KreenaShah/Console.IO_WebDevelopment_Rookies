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

function App() {
  const user = localStorage.getItem("secret_token");
  return (
    <div className="App">
      <Routes>
        {user && <Route path="/client/home" element={<Home />}></Route>}
        {user && <Route path="/addListing" element={<AddListing />}></Route>}
        {user && <Route path="/allListing" element={<AllListing />}></Route>}
        {user && <Route path="/worker/profile" element={<WorkerProf />}></Route>}
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register/worker" element={<WorkerReg />}></Route>
        <Route path="/register/client" element={<ClientRegister />}></Route>
        <Route path="/password-reset" element={<ForgotPwMail />}></Route>
        <Route path="/pwReset" element={<ResetPw />}></Route>
        <Route path='/map' element={<MapWithRouting />}></Route>
        <Route path="/verification-admin" element={<Verification />}></Route>
        <Route path="/workers-admin" element={<Workers />}></Route>
        <Route path="/clients-admin" element={<Clients />}></Route>
        <Route path="/landing" element={<LandingComponent />}></Route>
        <Route path="/" element={<Admin />}>
        </Route>
        <Route
          path="/addListing"
          element={<Navigate replace to="/login" />}
        ></Route>
        <Route path="/home" element={<Navigate replace to="/login" />}></Route>
      </Routes>
    </div>
  );
}

export default App;
