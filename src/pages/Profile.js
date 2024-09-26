import React, { useEffect } from "react";
import { FaPowerOff } from "react-icons/fa";
import "../Style/profile.css";
import userImage from "../images/user.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    document.title = "IMS || Profile";

    //if role is employee then redirect to employee_dashboard page
    if (user && user.role === "employee") {
      toast.warn("You can't access Admin Profile page");
      navigate("/user/employee_dashboard");
    }
  }, [navigate, user]);

  return (
    <>
      <div>
        <div className="bg-info profile_div_box p-5">
          <input
            type="button"
            id="logout"
            className="btn logout text-white"
            value={user.fname}
          />
          <FaPowerOff
            className="logout_icon text-white"
            onClick={() => {
              localStorage.removeItem('user');
              navigate("/login");
            }}
          />
        </div>
        <div className="bg-white profile_div_box2 shadow-lg mb-5">
          <div className="row p-5">
            <div className="col-md-4 left_part">
              <div className="profile-section">
                <img src={userImage} alt="Profile" className="profile-photo" />
              </div>
              <div className="text-center name">
                <p className="text-dark">
                  {user.fname} {user.lname}
                </p>
              </div>
            </div>

            <div className="col-md-8">
              <h3 className="text-dark profile_heading mb-2">
                Basic Information
              </h3>
              <div className="profile-details">
                <div className="profile_box">
                  <p className="info_text">First Name:</p>
                  <p className="info_content text-dark">{user.fname}</p>
                </div>
                <div className="profile_box">
                  <p className="info_text">Last Name:</p>
                  <p className="info_content text-dark">{user.lname}</p>
                </div>
                <div className="profile_box">
                  <p className="info_text">Email Address:</p>
                  <p className="info_content text-dark">{user.email}</p>
                </div>
                <div className="profile_box">
                  <p className="info_text text-start">Mobile Number:</p>
                  <p className="info_content text-dark">{user.mobile}</p>
                </div>
                <div className="profile_box profile_box2">
                  <p className="info_text">Age:</p>
                  <p className="info_content text-dark">{user.age}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
