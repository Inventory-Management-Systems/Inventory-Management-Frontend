import React, { useState, useEffect, useMemo } from 'react';
import '../Style/employee.css';
import { Modal } from 'react-bootstrap';
import { FaPowerOff, FaTrashAlt, FaPen } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getAllEmployeeService, addEmployeeService, deleteEmployeeService, updateEmployeeService } from '../Services/UserService';
import { toast } from 'react-toastify';


const Employees = () => {
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState({});
    const user = useMemo(() => JSON.parse(localStorage.getItem('user')), []);

    const handleClick = (employee) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEmployeeService(employee)
                    .then((response) => {
                        if (response) {
                            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                        } else {
                            Swal.fire('Error!', 'Failed to delete the item.', 'error');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire('Error!', 'Something went wrong.', 'error');
                    });
            }
        });
    };


    const handleUpdateClick = (employee) => {
        setSelectedEmployee(employee);
        setModal2(true);
    };

    const handleUpdateClickModal = (employee) => {

        var isValid = true;

        //to check first name must not be empty
        if (employee.fname.trim() === "") {
            displayError("First name must not be empty");
            isValid = false;
        }

        //to check last name must not be empty
        if (employee.lname.trim() === "") {
            displayError("Last name must not be empty");
            isValid = false;
        }

        //to check mobile number is number and length must be atleast 10 digit
        if (!isValidMobile(employee.mobile)) {
            displayError("Invalid phone number");
            isValid = false;
            return;
        }

        //to check email must not be empty and ends with @nucleusTeq.com
        if (employee.email.trim() === " ") {
            isValid = false;
        } else if (!isValidEmail(employee.email)) {
            displayError("Invalid email address");
            isValid = false;
            return;
        }

        // to check age is not less than to 18 or greater than 100
        if (employee.age <= 18 || employee.age >= 100) {
            displayError("Age Criteria Not Matched");
            isValid = false;
            return;
        }

        if (isValid) {
            updateEmployeeService(employee)
                .then((response) => {
                    if (response.success) {
                        setModal2(false);
                        toast.success(response.message);
                        // Perform any additional actions on success
                    } else {
                        toast.error(response.message);
                        // Perform any additional actions on error
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Something went wrong');
                });
        }
    };


    const handleSeeDetailClick = (employee) => {
        setSelectedEmployee(employee);
        navigate('/user/employee_details', { state: { employee } });
    };

    useEffect(() => {
        document.title = 'IMS || Manage Employees';

        //if role is employee then redirect to employee_dashboard page
        if (user && user.role === "employee") {
            toast.warn("You can't access Manage Employees page");
            navigate("/user/employee_dashboard");
        }

        getAllEmployeeService()
            .then((response) => {
                setEmployees(response);
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong');
            });
    }, [navigate, user]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSelectedEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    const handleAddEmployee = (event) => {
        event.preventDefault();
        const employee = {
            fname: event.target.fname.value,
            lname: event.target.lname.value,
            email: event.target.email.value,
            mobile: event.target.mobile.value,
            password: event.target.password.value,
            age: event.target.age.value,
            dob: event.target.dob.value,
            role: "employee",
        };

        var isValid = true;

        //to check first name must not be empty
        if (employee.fname.trim() === "") {
            displayError("First name must not be empty");
            isValid = false;
        }

        //to check last name must not be empty
        if (employee.lname.trim() === "") {
            displayError("Last name must not be empty");
            isValid = false;
        }

        //to check mobile number is number and length must be atleast 10 digit
        if (!isValidMobile(employee.mobile)) {
            displayError("Invalid phone number");
            isValid = false;
            return;
        }

        //to check email must not be empty and ends with @nucleusTeq.com
        if (employee.email.trim() === " ") {
            isValid = false;
        } else if (!isValidEmail(employee.email)) {
            displayError("Invalid email address");
            isValid = false;
            return;
        }

        // to check age is not less than to 18 or greater than 100
        if (employee.age <= 18 || employee.age >= 100) {
            displayError("Age Criteria Not Matched");
            isValid = false;
            return;
        }

        //to check pswd must not be empty , minimum length 8 and contains (1 number, 1 capital letter, 1 small letter and 1 special character)
        if (employee.password.trim() === " ") {
            isValid = false;
        } else if (!isValidPassword(employee.password)) {
            displayError("Password is Invalid");
            isValid = false;
        }

        //if all validation is returns true then Add Employee Service will be called
        if (isValid) {
            //Add Employee service has been called if response is success then employee added to database else show error message
            addEmployeeService(employee)
                .then((response) => {
                    if (response.success) {
                        toast.success(response.message);
                        setModal(false);
                    } else {
                        toast.error(response.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Something went wrong');
                });
        }
    };

    // It takes an error message as input and shows it as a toast notification on the screen.
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

    function isValidMobile(mobile) {
        // Mobile Number validation using regular expression
        // var mobileRegex = /^[0-9]+$/;
        var mobileRegex = /^\d{10}$/;
        return mobileRegex.test(mobile);
    }


    return (
        <div>
            <Modal size='lg' show={modal} onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='modal_header text-center'>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="" onSubmit={handleAddEmployee}>
                        <div>
                            <div className="row popup_form" >
                                <div className="col-md-6 flex-grow-1">
                                    <div className='mb-3'>
                                        <label htmlFor="name" className='bold'>First Name</label>
                                        <input type="text" name="fname" id="fname" placeholder='Enter your first name' className='form-control' required />
                                    </div>
                                    <div className='mb-1'>
                                        <label htmlFor="email" className='bold'>Email</label>
                                        <input type="email" name="email" id="email" placeholder='Email: example@nucleusteq.com' className='form-control' required />
                                    </div>
                                </div>
                                <div className="col-md-6 flex-grow-1">
                                    <div className='mb-3'>
                                        <label htmlFor="name" className='bold'>Last Name</label>
                                        <input type="text" name="lname" id="lname" placeholder='Enter your first name' className='form-control' required />
                                    </div>
                                    <div className='mb-1'>
                                        <label htmlFor="mobile" className='bold'>Mobile</label>
                                        <input type="text" name="mobile" id="mobile" placeholder='Enter your mobile number' className='form-control' required />
                                    </div>
                                </div>
                                <div className="row popup_form" >
                                    <div className="col-md-6 flex-grow-1">
                                        <div className='mb-1'>
                                            <label htmlFor="password" className='bold'>Password</label>
                                            <input type="password" name="password" id="password" placeholder='Enter your password' className='form-control' required />
                                        </div>
                                    </div>
                                    <div className="col-md-3 flex-grow-1">
                                        <div className='mb-1'>
                                            <label htmlFor="age" className='bold'>Age</label>
                                            <input type="number" name="age" id="age" placeholder='Enter your age' className='form-control' required />
                                        </div>
                                    </div>
                                    <div className="col-md-2 flex-grow-1">
                                        <div className='mb-1'>
                                            <label htmlFor="dob" className='bold'>Date of Birth</label>
                                            <input type="date" id="dob" name="dob" className='form-control' required />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-grid'>
                                    <button className='btn btn-primary mt-4 register_btn'>Add Employee</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal size='lg' show={modal2} onHide={() => setModal2(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='modal_header text-center'>Update Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="">
                        <div>
                            <div className="row popup_form" >
                                <div className="col-md-6 flex-grow-1">
                                    <div className='mb-3'>
                                        <label htmlFor="name" className='bold'>First Name</label>
                                        <input
                                            type="text"
                                            name="fname"
                                            id="fname"
                                            placeholder='Enter your first name'
                                            className='form-control'
                                            required
                                            value={selectedEmployee ? selectedEmployee.fname : ''}
                                            onChange={handleInputChange}
                                        />

                                    </div>
                                    <div className='mb-1'>
                                        <label htmlFor="email" className='bold'>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder='Email: example@nucleusteq.com'
                                            className='form-control'
                                            required
                                            value={selectedEmployee ? selectedEmployee.email : ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='mb-1'>
                                        <label htmlFor="age" className='bold'>Age</label>
                                        <input
                                            type="number"
                                            name="age"
                                            id="age"
                                            placeholder='Enter your age'
                                            className='form-control'
                                            required
                                            value={selectedEmployee ? selectedEmployee.age : ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 flex-grow-1">
                                    <div className='mb-3'>
                                        <label htmlFor="name" className='bold'>Last Name</label>
                                        <input
                                            type="text"
                                            name="lname"
                                            id="lname"
                                            placeholder='Enter your first name'
                                            className='form-control'
                                            required
                                            value={selectedEmployee ? selectedEmployee.lname : ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='mb-1'>
                                        <label htmlFor="mobile" className='bold'>Mobile</label>
                                        <input
                                            type="text"
                                            name="mobile"
                                            id="mobile"
                                            placeholder='Enter your mobile number'
                                            className='form-control'
                                            required
                                            value={selectedEmployee ? selectedEmployee.mobile : ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='mb-1'>
                                        <label htmlFor="dob" className='bold'>Date of Birth</label>
                                        <input
                                            type="date"
                                            id="dob"
                                            name="dob"
                                            className='form-control'
                                            required
                                            value={selectedEmployee ? selectedEmployee.dob : ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className='d-grid'>
                                    <button
                                        className='btn btn-primary mt-4 register_btn'
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleUpdateClickModal(selectedEmployee)
                                        }}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <div className='bg-info emp_div_box p-5 '>
                <input type='button' id='logout' className='btn logout text-white' value={user.fname} />
                <FaPowerOff className='logout_icon text-white' onClick={() => {
                    localStorage.removeItem('user');
                    navigate("/login");
                }} />
            </div>
            <div className='bg-white emp_div_box2 shadow-lg mb-5 px-4'>
                <div>
                    <div className="row py-3 top_div">
                        <div className="col-md-6 heading_div">
                            <span className='heading fw-bold'>Employees</span>
                        </div>
                        <div className="col-md-6 pt-2 text-end btn_div">
                            <button className='btn btn-primary p-2' onClick={() => setModal(true)}>
                                Add Employee
                            </button>
                        </div>
                    </div>
                    <div className='table-responsive'>
                        <table className="table text-dark table-margin">
                            <thead>
                                <tr className='text-center'>
                                    <th>S No.</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Age</th>
                                    <th>DOB</th>
                                    <th>Actions</th>
                                    <th>More Info</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee, index) => (
                                    <tr key={employee.id} className='text-center'>
                                        <td>{index + 1}</td>
                                        <td>{employee.fname}</td>
                                        <td>{employee.lname}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.mobile}</td>
                                        <td>{employee.age}</td>
                                        <td>{employee.dob}</td>
                                        <td>
                                            <FaPen onClick={() => handleUpdateClick(employee)} />
                                            <FaTrashAlt className="actions text-danger" onClick={() => handleClick(employee)} />
                                        </td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleSeeDetailClick(employee)}>
                                                See Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employees;
