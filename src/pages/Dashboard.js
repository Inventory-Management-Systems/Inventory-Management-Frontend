import React from "react";
import "../Style/dashboard.css";
import { useEffect, useState } from "react";
import { FaPowerOff, FaUsers, FaShoppingCart } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { getEmployeesCount, getAdminCount } from '../Services/UserService';
import { getItemCount } from '../Services/ItemService';
import { getEmployeesAndItems } from '../Services/AssignmentService';
import { useMemo } from "react";


const Dashboard = () => {
  const navigate = useNavigate();
  const user = useMemo(() => JSON.parse(localStorage.getItem('user')), []);
  const [employeCount, setEmployeCount] = useState([]);
  const [adminCount, setAdminCount] = useState([]);
  const [itemCount, setItemCount] = useState([]);
  const [employeeAssignItems, setEmployeeAssignItems] = useState([]);


  useEffect(() => {
    document.title = "IMS || Dashboard";

    //if role is employee then redirect to employee_dashboard page
    if (user && user.role === "employee") {
      toast.warn("You can't access Admin Dashboard page");
      navigate("/user/employee_dashboard");
    }

    getEmployeesCount()
      .then((response) => {
        setEmployeCount(response);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong');
      });

    getAdminCount()
      .then((response) => {
        if (response > 0) {
          setAdminCount(response);
        } else {
          toast.error('No admin exist');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong');
      });

    getItemCount()
      .then((response) => {
        setItemCount(response);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong');
      });


    getEmployeesAndItems()
      .then((response) => {
        setEmployeeAssignItems(response);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong');
      });
  }, [navigate, user]);

  return (
    <div>
      <div className="bg-info dashboard_div_box p-5">
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

      <div className="bg-white dashboard_div_box2 center-box shadow-lg p-3 mb-5">
        <span className="dashboard_heading fw-bold px-4">Dashboard</span>
        <div className="valuess my-4 row">
          <div className="value-box m-3 col-md-3">
            <FaUsers className="i" />
            <div>
              <h3>{employeCount}</h3>
              <span className="text-white">Total Employees</span>
            </div>
          </div>
          <div className="value-box m-3 col-md-3 bg-succes">
            <FaShoppingCart className="i p-2" />
            <div>
              <h3>{itemCount}</h3>
              <span className="text-white">Total Items</span>
            </div>
          </div>
          <div className="value-box m-3 col-md-3 bg-succes">
            <MdAdminPanelSettings className="i" />
            <div>
              <h3>{adminCount}</h3>
              <span className="text-white">Total Admins</span>
            </div>
          </div>
        </div>
        <div className="my-3 dashboard_table_div">
          <table className="table dashboard_table">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Employees</th>
                <th>Assign Items</th>
              </tr>
            </thead>
            <tbody>
              {employeeAssignItems.map((employeeAssignItem, index) => (
                <tr key={index}>
                  <td className="item_list">{index + 1}</td>
                  <td className="item_list">{employeeAssignItem.employeeName}</td>
                  <td className="item_list">{employeeAssignItem.itemName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
