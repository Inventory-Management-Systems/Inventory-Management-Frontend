import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./mycomponents/Home";
import Footer from "./mycomponents/Footer";
import Signup from "./mycomponents/Signup";
import Login from "./mycomponents/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Items from "./pages/Items";
import Employees from "./pages/Employees";
// import AssignItems from './pages/AssignItems';
import Profile from "./pages/Profile";
import EmployeeProfile from "./pages/EmployeeProfile";
import SideBar from "./mycomponents/SideBar";
import EmployeeDetails from "./pages/EmployeeDetails";
import { ToastContainer } from 'react-toastify';
import PrivateRoutes from "./mycomponents/PrivateRoutes";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div
      className="app-container bg-light"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <ToastContainer />
      <BrowserRouter>
        <div style={{ flex: "1 0 auto" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<MainContent />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

function MainContent() {
  return (
    <SideBar>
      <Routes>
        <Route path='/user' element={<PrivateRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employee_dashboard" element={<EmployeeDashboard />} />
          <Route path="items" element={<Items />} />
          <Route path="employees" element={<Employees />} />
          <Route path="employee_details" element={<EmployeeDetails />} />
          {/* <Route path='assign_items' element={<AssignItems />} /> */}
          <Route path="profile" element={<Profile />} />
          <Route path="employee_profile" element={<EmployeeProfile />} />
        </Route>
      </Routes>
    </SideBar>
  );
}

export default App;
