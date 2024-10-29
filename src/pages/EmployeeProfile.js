import React, { useEffect, useMemo, useState } from 'react';
import { FaPowerOff } from 'react-icons/fa';
import '../Style/employeeprofile.css';
import userImage from "../images/user.png"
import { useNavigate } from "react-router-dom";
import { getEmployeeAssignItemNames } from '../Services/AssignmentService';
import { toast } from 'react-toastify';

const Profile = () => {
  const user = useMemo(() => JSON.parse(localStorage.getItem('user')), []);
  const navigate = useNavigate();
  const [assignedItems, setAssignedItems] = useState([]);

  useEffect(() => {
    document.title = "IMS || Profile";

    //if role is admin then redirect to dashboard page
    if (user && user.role === "admin") {
      toast.warn("You can't access Employee Profile page");
      navigate("/user/dashboard");
    }

    getEmployeeAssignItemNames(user.id)
      .then((response) => {
        setAssignedItems(response);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong');
      });
  }, [navigate, user]);


  return (
    <div>
      <div className='bg-info emp_profile_div_box p-5'>
        <input type='button' id='logout' className='btn logout text-white' value={user.fname} />
        <FaPowerOff className='logout_icon text-white' onClick={() => {
          localStorage.removeItem('user');
          navigate("/login");
        }} />
      </div>
      <div className='bg-white emp_profile_div_box2 shadow-lg mb-5'>
        <div className='emp_profile-section'>
          <img src={userImage} alt="emp_profile" className='emp_profile-photo' />
        </div>
        <div className='text-center name'>
          <p className='text-dark'>{user.fname} {user.lname}</p>
        </div>

        <div className="row mt-2 p-5" >
          <div className="col-md-7 mb-5">
            <h3 className='text-dark emp_profile_heading mb-4'>Basic Information</h3>
            <div className='emp_profile-details'>
              <div className='emp_profile_box'>
                <p className="info_text">First Name:</p>
                <p className='info_content text-dark'>{user.fname}</p>
              </div>
              <div className='emp_profile_box'>
                <p className="info_text">Last Name:</p>
                <p className='info_content text-dark'>{user.lname}</p>
              </div>
              <div className='emp_profile_box'>
                <p className="info_text">Email Address:</p>
                <p className='info_content text-dark'>{user.email}</p>
              </div>
              <div className='emp_profile_box'>
                <p className="info_text text-start">Mobile Number:</p>
                <p className='info_content text-dark'>{user.mobile}</p>
              </div>
              <div className='emp_profile_box emp_profile_box2'>
                <p className="info_text">Age:</p>
                <p className='info_content text-dark'>{user.age}</p>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <h3 className='text-dark emp_profile_heading mb-4'>Assigned Items</h3>
            <div className='emp_profile_table_div'>
              <table className='table emp_profile_table'>
                <thead>
                  <tr>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedItems.length > 0 ? (
                    assignedItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No Items Assign</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
