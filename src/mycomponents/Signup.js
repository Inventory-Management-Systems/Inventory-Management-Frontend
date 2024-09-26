import React, { useState, useEffect } from "react";
import "../Style/signup.css";
import image from "../images/bg.png";
import S from "../images/S.png";
import { Link } from "react-router-dom";
import { signUpService } from "../Services/AuthenticationService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [role, setrole] = useState("employee");
  const [secretKey, setSecretKey] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    document.title = "IMS || Registration";
  }, [formData, role]);

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;


    //to check pswd is matches with confirm password or not
    if (password !== confirmPasswordValue) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  // this function called when user clicks on register button
  const handleSubmit = (e) => {
    e.preventDefault();

    var isValid = true;

    //to check first name must not be empty
    if (fname.trim() === "") {
      displayError("First name must not be empty");
      isValid = false;
    }

    //to check last name must not be empty
    if (lname.trim() === "") {
      displayError("Last name must not be empty");
      isValid = false;
    }

    //to check mobile number is number and length must be atleast 10 digit
    if (!isValidMobile(mobile)) {
      displayError("Invalid phone number");
      isValid = false;
      return;
    }

    // if (mobile.length !== 10) {
    //   displayError("Mobile number must be at least 10 digits");
    //   isValid = false;
    // } else if (!isValidMobile(mobile)) {
    //   displayError("Invalid phone number");
    //   isValid = false;
    //   return;
    // }

    //to check email must not be empty and ends with @nucleusTeq.com
    if (email.trim() === " ") {
      isValid = false;
    } else if (!isValidEmail(email)) {
      displayError("Invalid email address");
      isValid = false;
      return;
    }

    // to check age is not less than to 18 or greater than 100
    if (age <= 18 || age >= 100) {
      displayError("Age Criteria Not Matched");
      isValid = false;
      return;
    }

    //to check pswd must not be empty , minimum length 8 and contains (1 number, 1 capital letter, 1 small letter and 1 special character)
    if (password.trim() === " ") {
      isValid = false;
    } else if (!isValidPassword(password)) {
      displayError("Password is Invalid");
      isValid = false;
    }

    //to check if user is admin then secret key is valid
    if (role === "admin" && secretKey !== "M@$ter123") {
      displayError("Invalid Secret Key");
      return;
    }

    //if all validation is returns true then signUp service will be called
    if (isValid) {
      const formData = {
        fname: fname,
        lname: lname,
        email: email,
        mobile: mobile,
        age: age,
        dob: dob,
        password: password,
        role: role,
        secretKey: secretKey,
      };

      setFormData(formData);

      //signUp service has been called if response is success then redirect to login page else show error message
      signUpService(formData)
        .then((response) => {
          if (response.success) {
            navigate("/login");
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

  // It takes an error message as input and shows it as a toast notification on the screen.
  function displayError(errorMessage) {
    toast.error(errorMessage);
  }

  // Email validation using regular expression
  function isValidEmail(email) {
    var emailRegex = /@nucleusteq\.com$/;
    return emailRegex.test(email);
  }

  // Password validation using regular expression
  function isValidPassword(password) {
    var passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  // Mobile Number validation using regular expression
  function isValidMobile(mobile) {
    // var mobileRegex = /^[0-9]+$/;
    var mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  }

  return (
    <div>
      <div className="signup_page">
        {/* background_img */}
        <img
          src={image}
          alt=""
          style={{ width: "100%", height: "100vh", filter: "blur(4px)" }}
        />
        <div
          className="signup_container mt-2"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="row">
            <div className="col-md-8 left_signup px-5">
              {/* signup_form begins */}
              <form action="" onSubmit={handleSubmit}>
                <div className="signup_heading my-3">
                  <span style={{ fontSize: "40px" }}>
                    <span style={{ textDecoration: "underline #0d6efd" }}>
                      Re
                    </span>
                    gistration
                  </span>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3 inputs">
                      <label htmlFor="name" className="bold">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="fname"
                        id="fname"
                        placeholder="Enter your first name"
                        className="form-control"
                        required
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="mb-3 inputs">
                      <label htmlFor="name" className="bold">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lname"
                        id="lname"
                        placeholder="Enter your first name"
                        className="form-control"
                        required
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="mb-3 inputs">
                      <label htmlFor="email" className="bold">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email: example@nucleusteq.com"
                        className="form-control"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="mb-3 inputs">
                      <label htmlFor="mobile" className="bold">
                        Mobile
                      </label>
                      <input
                        type="text"
                        name="mobile"
                        id="mobile"
                        placeholder="Enter your mobile number"
                        className="form-control"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="mb-3 inputs">
                      <label htmlFor="age" className="bold">
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        id="age"
                        placeholder="Enter your age"
                        className="form-control"
                        required
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="mb-3 inputs">
                      <label htmlFor="dob" className="bold">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        className="form-control"
                        required
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 inputs">
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 inputs">
                      <label htmlFor="confirmPassword" className="bold">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmpassword"
                        id="confirmpassword"
                        placeholder="Confirm your password"
                        className="form-control"
                        required
                        onChange={handleConfirmPasswordChange}
                      />
                      <span id="password-error-message" className="text-danger">
                        {passwordError}
                      </span>
                    </div>
                  </div>

                  {/* bottom of from  */}
                  <div className="col-md-6 flex-grow-1 radiobtn">
                    <div className="mb-3 mt-3 text-start ">
                      Register As?
                      <input
                        type="radio"
                        name="role"
                        value="employee"
                        id="employee"
                        defaultChecked
                        onChange={(e) => setrole(e.target.value)}
                        className="mx-2"
                      />
                      <label htmlFor="employee" className="bold">
                        Employee
                      </label>
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        id="admin"
                        onChange={(e) => setrole(e.target.value)}
                        className="mx-2"
                        required
                      />
                      <label htmlFor="admin" className="bold">
                        Admin
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 flex-grow-1">
                    {role === "admin" ? (
                      <div className="mb-3 inputs">
                        <label htmlFor="key" className="bold">
                          Secret Key
                        </label>
                        <input
                          type="text"
                          name="key"
                          id="key"
                          placeholder="Enter secret key"
                          className="form-control"
                          required
                          value={secretKey}
                          onChange={(e) => setSecretKey(e.target.value)}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary mt-4 register_btn">
                    Register
                  </button>
                </div>

                <p className="text-center mt-2 pb-4 alr">
                  Already have an account?{" "}
                  <Link to="/login" className="sm-2">
                    Sign in
                  </Link>
                </p>
              </form>
              {/* end of signup_form */}
            </div>

            {/* signup immage */}
            <div className="col-md-4 right_signup signup_img">
              <img
                src={S}
                alt=""
                style={{ width: "100%", maxHeight: "70vh" }}
              />
            </div>
            {/* end of signup_img */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
