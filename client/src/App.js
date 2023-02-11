import './App.css';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Home from './components/Home/Home';
import Main from './components/Main/Main';
import ForgotPwMail from './components/PwReset/ForgotPwMail';
import ResetPw from './components/PwReset/ResetPw';
import WorkerProf from './components/Worker/workerProf';
import AddListing from './components/Listing/AddListing'
import AllListing from './components/Listing/AllListing';
import { Routes, Route ,Navigate} from "react-router-dom";

function App() {
  const user = localStorage.getItem("secret_token");
  return (
    <div className="App">
      <Routes>
        {user && <Route path="/home" element={<Home />}></Route>}
        {user && <Route path="/addListing" element={<AddListing />}></Route>}
        {user && <Route path="/allListing" element={<AllListing />}></Route>}
        {user && <Route path="/worker/profile" element={<WorkerProf />}></Route>}
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/password-reset" element={<ForgotPwMail />}></Route>
        <Route path="/pwReset" element={<ResetPw />}></Route>
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
