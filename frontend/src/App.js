import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/user/HomePage";
import Login from "./components/common/Login";
import SignUp from "./components/common/SignUp";
import Complaint from "./components/user/Complaint";
import Status from "./components/user/Status";
import AdminHome from "./components/admin/AdminHome";
import AgentHome from "./components/agent/AgentHome";
import UserInfo from "./components/admin/UserInfo";
import Home from "./components/common/Home";
import AgentInfo from "./components/admin/AgentInfo";
import About from "./components/common/About"; 

function App() {
  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} /> 

          {isLoggedIn ? (
            <>
              <Route path="/agentinfo" element={<AgentInfo />} />
              <Route path="/agenthome" element={<AgentHome />} />
              <Route path="/userinfo" element={<UserInfo />} />
              <Route path="/adminhome" element={<AdminHome />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/complaint" element={<Complaint />} />
              <Route path="/status" element={<Status />} />
            </>
          ) : (
            <Route path="/login" element={<Login />} /> // fallback for unauthenticated
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
