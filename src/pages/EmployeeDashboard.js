import React from "react";
import "../Style/employeeDashboard.css";
import { useEffect, useState } from "react";
import { FaPowerOff, FaExchangeAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getEmployeeAssignItems, getEmployeeAssignItemCount } from '../Services/AssignmentService';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [assignedItems, setAssignedItems] = useState([]);
  const [assignmentCount, setAssignedItemsCount] = useState([]);

  useEffect(() => {
    document.title = "IMS || Dashboard";

    //if role is admin then redirect to dashboard page
    if (user && user.role === "admin") {
      toast.warn("You can't access Employee Dashboard page");
      navigate("/user/dashboard");
    }

    getEmployeeAssignItems(user.id)
      .then((response) => {
        setAssignedItems(response);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong');
      });

    getEmployeeAssignItemCount(user.id)
      .then((response) => {
        if (response > 0) {
          setAssignedItemsCount(response);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong');
      });
  }, []);


  return (
    <div>
      <div className="bg-info emp_dashboard_div_box p-5">
        <input
          type="button"
          id="logout"
          className="btn logout text-white"
          value={user.fname}
        />
        <FaPowerOff className='logout_icon text-white' onClick={() => {
          localStorage.removeItem('user');
          navigate("/login");
        }} />
      </div>

      <div className="bg-white emp_dashboard_div_box2 center-box shadow-lg p-3 mb-5">
        <p className="emp_dashboard_heading fw-bold px-4">Dashboard</p>
        <div className="values my-4">
          <div className="value-box m-3">
            <FaExchangeAlt className="ed_i p-2" />
            <div>
              <h3>{assignmentCount}</h3>
              <span className="text-white ">Total Assign Items</span>
            </div>
          </div>
        </div>
        <div className="my-3 emp_dashboard_table_div">
          <table className="table emp_dashboard_table">
            <thead>
              <tr>
                <th>Assign Items</th>
                <th>Category</th>
                <th>Serial Number</th>
                <th>Bill Number</th>
                <th>Warranty</th>
              </tr>
            </thead>
            <tbody>
              {assignedItems.length > 0 ? (
                assignedItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.serialNumber}</td>
                    <td>{item.billNumber}</td>
                    <td>{item.warranty}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Null</td>
                  <td>Null</td>
                  <td>Null</td>
                  <td>Null</td>
                  <td>Null</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
