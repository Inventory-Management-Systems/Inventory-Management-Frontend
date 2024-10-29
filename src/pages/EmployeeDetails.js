import React, { useState, useEffect, useMemo } from "react";
import { FaPowerOff } from "react-icons/fa";
import "../Style/employeedetails.css";
import userImage from "../images/user.png";
import { Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getEmployeeAssignItems,
  getEmployeeUnassignItems,
  assignItemToEmployee,
  unassignItemToEmployee,
} from "../Services/AssignmentService";
import { toast } from "react-toastify";

const EmployeeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const employee = location.state?.employee || {};
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const user = useMemo(() => JSON.parse(localStorage.getItem('user')), []);
  const [assignedItems, setAssignedItems] = useState([]);
  const [unassignedItems, setUnassignedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  // employee.id = 0;

  useEffect(() => {
    document.title = "IMS || Employee Details";

    //if role is employee then redirect to employee_dashboard page
    if (user && user.role === "employee") {
      toast.warn("you can't access Employee Details page");
      navigate("/user/employee_dashboard");
    }

    getEmployeeAssignItems(employee.id)
      .then((response) => {
        setAssignedItems(response);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });

    getEmployeeUnassignItems(employee.id)
      .then((response) => {
        setUnassignedItems(response);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  }, [employee, user, navigate]);

  const handleCheckboxChange = (event, item) => {
    event.preventDefault();
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((selectedItem) => selectedItem !== item)
      );
    }
  };

  const handleAssignItems = (event) => {
    event.preventDefault();
    setModal1(false);
    console.log(selectedItems);
    console.log(selectedItems.length);

    const itemIds = selectedItems.map((item) => item.id);

    assignItemToEmployee(employee.id, itemIds)
      .then((response) => {
        getEmployeeUnassignItems(employee.id)
          .then((response) => {
            setUnassignedItems(response);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Something went wrong");
          });

        getEmployeeAssignItems(employee.id)
          .then((response) => {
            setAssignedItems(response);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Something went wrong");
          });
        toast.success("Item Assign Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
    setSelectedItems([]);
    console.log("assign empty items", selectedItems);
  };

  const handleUnassignItems = (event) => {
    event.preventDefault();
    setModal2(false);
    console.log(selectedItems);
    console.log(selectedItems.length);

    const itemIds = selectedItems.map((item) => item.id);

    unassignItemToEmployee(employee.id, itemIds)
      .then((response) => {
        getEmployeeUnassignItems(employee.id)
          .then((response) => {
            setUnassignedItems(response);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Something went wrong");
          });

        getEmployeeAssignItems(employee.id)
          .then((response) => {
            setAssignedItems(response);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Something went wrong");
          });
        toast.success("Item Unassign Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });

    setSelectedItems([]);
    console.log("unassign empty items", selectedItems);
  };

  return (
    <div>
      <Modal size="l" show={modal1} onHide={() => setModal1(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="modal_header text-center">
            Assign Items
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div className="empd_table_div">
              <table className="table empd_table">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" value="select" disabled />
                    </th>
                    <th>Item Names</th>
                  </tr>
                </thead>
                <tbody>
                  {unassignedItems.map((item, index) => (
                    <tr key={index}>
                      <td className="check_box">
                        <input
                          type="checkbox"
                          id="checkbox"
                          onChange={(event) =>
                            handleCheckboxChange(event, item)
                          }
                        />
                      </td>
                      <td className="item_list">
                        {item.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-grid">
              <button
                className="btn btn-primary mt-4 register_btn"
                onClick={(event) => {
                  handleAssignItems(event);
                }}
              >
                Assign Items
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal size="l" show={modal2} onHide={() => setModal2(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="modal_header">Unassign Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div className="empd_table_div">
              <table className="table empd_table">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" value="select" disabled />
                    </th>
                    <th>Item Names</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedItems.length > 0 ? (
                    assignedItems.map((item, index) => (
                      <tr key={index}>
                        <td className="check_box">
                          <input
                            type="checkbox"
                            id="checkbox"
                            onChange={(event) =>
                              handleCheckboxChange(event, item)
                            }
                          />
                        </td>
                        <td className="item_list">
                          {item.name}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td></td>
                      <td>No Items Assign</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="d-grid">
              <button
                className="btn btn-primary mt-4 register_btn"
                onClick={(event) => {
                  handleUnassignItems(event);
                }}
              >
                Unassign Items
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className="bg-info emp_detail_div_box p-5">
        <input
          type="button"
          id="logout"
          className="btn logout text-white"
          value={user.fname}
        />
        <FaPowerOff
          className="logout_icon text-white"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
        />
      </div>
      <div className="bg-white emp_detail_div_box2 shadow-lg">
        <div className="empd-section">
          <img src={userImage} alt="empd" className="empd-photo" />
        </div>
        <div className="text-center name">
          <p className="text-dark">
            {employee.fname} {employee.lname}
          </p>
        </div>
        <div className="row px-5 mb-5 ">
          <div className="col-md-7 mb-1 mt-5">
            <h3 className="text-dark empd_heading mb-4">Basic Information</h3>
            <div className="empd-details">
              <div className="empd_box">
                <p className="info_text">First Name:</p>
                <p className="info_content text-dark">{employee.fname}</p>
              </div>
              <div className="empd_box">
                <p className="info_text">Last Name:</p>
                <p className="info_content text-dark">{employee.lname}</p>
              </div>
              <div className="empd_box">
                <p className="info_text">Email Address:</p>
                <p className="info_content text-dark">{employee.email}</p>
              </div>
              <div className="empd_box">
                <p className="info_text">Mobile Number:</p>
                <p className="info_content text-dark">{employee.mobile}</p>
              </div>
              <div className="empd_box empd_box2">
                <p className="info_text">Age:</p>
                <p className="info_content text-dark">{employee.age}</p>
              </div>
            </div>
          </div>
          <div className="col-md-5 mt-5">
            <h3 className="text-dark empd_heading mb-4">Assigned Items</h3>
            <div className="empd_table_div">
              <table className="table empd_table">
                <thead>
                  <tr>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedItems.length > 0 ? (
                    assignedItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
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

        <div className="text-center mb-5">
          <button
            className="btn btn-success mx-5 mb-5"
            onClick={() => setModal1(true)}
          >
            Assign Items
          </button>
          <button
            className="btn btn-danger mb-5"
            onClick={() => setModal2(true)}
          >
            Unassign Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
