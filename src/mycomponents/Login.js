import React, { useEffect, useState } from "react";
import "../Style/signup.css";
import image from "../images/bg.png";
import sideimage from "../images/1.avif";
import { Link } from "react-router-dom";
import { loginService } from "../Services/AuthenticationService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "IMS || Login";
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    var isValid = true;

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email.trim() === " ") {
      isValid = false;
    } else if (!isValidEmail(email)) {
      displayError("Invalid email address");
      isValid = false;
      return;
    }

    if (password.trim() === " ") {
      isValid = false;
    } else if (!isValidPassword(password)) {
      displayError("Password is Invalid");
      isValid = false;
    }

    if (isValid) {
      const formData = {
        email: email,
        password: password,
      };

      setData(formData);
      loginService(formData)
        .then((response) => {
          console.log(response.user);
          if (response.success) {
            localStorage.setItem("user", JSON.stringify(response.user));
            const user = JSON.parse(localStorage.getItem("user"));
            if (user.role === "admin") {
              navigate("/user/dashboard");
            } else {
              navigate("/user/employee_dashboard");
            }
          } else {
            displayError(response.message);
          }
        })
        .catch((error) => {
          console.log(error);
          displayError("Something went wrong");
        });
    }
  };

  function displayError(errorMessage) {
    toast.error(errorMessage);
  }

  function isValidEmail(email) {
    // Simple email validation using regular expression
    var emailRegex = /@nucleusteq\.com$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    // Password validation using regular expression
    var passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  return (
    <div>
      <div className="login_page">
        <img
          src={image}
          alt=""
          style={{ width: "100%", height: "100vh", filter: "blur(4px)" }}
        />

        <div
          className="container_card"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="row">
            <div className="col-md-6 left_login">
              <form onSubmit={handleSubmit}>
                <div className="my-4 mx-3 text-center">
                  <span
                    className="login_heading"
                    style={{ fontSize: "40px", marginBottom: "40px" }}
                  >
                    {" "}
                    <span style={{ textDecoration: "underline #0d6efd" }}>
                      Lo
                    </span>
                    gin
                  </span>
                </div>

                <div className="mb-3 mx-3">
                  <label htmlFor="email" className="bold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email address"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3 mx-3">
                  <label htmlFor="password" className="bold">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="form-control"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary mt-4 register_btn"
                  >
                    Login
                  </button>
                </div>
                <p className="text-end mt-2">
                  Create a new account?{" "}
                  <Link to="/signup" className="sm-2 signup_link">
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
            <div className="col-md-6 login_img">
              <img
                src={sideimage}
                alt=""
                style={{ width: "100%", height: "400px", borderRadius: "10px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
