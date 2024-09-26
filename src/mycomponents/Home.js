import React from 'react';
// import inventory from '../images/inventory.jpeg';
import inventory from '../images/inventory.png';
import { Link } from 'react-router-dom';
import '../Style/home.css';

const Home = () => {
  return (
    <div className="container-fluid bg-container">
      <div className="container m-3">
        <div className="card bg-light white_box shadow-lg">
          <div className="row">
            <div className="col-lg-5 px-5">
              <div className="mt-4 logo-container">
                <span className="logo-letter" id="letter1">I</span>
                <span className="logo-letter" id="letter2">M</span>
                <span className="logo-letter" id="letter3">S</span>
              </div>
              <div>
                <p className="title mt-2">Inventory</p>
                <p className="title t2 mb-2">Management</p>
              </div>
              <p className="description">
                Inventory Management is a web application that helps businesses track and manage their inventory. The application has two types of users: Admin and Employee. Admins can add/delete employees, add/update/delete items in the inventory, assign/unassign items to employees, and view details of all employees and items. Employees can view the details of items assigned to them. The application is developed using ReactJS and SpringBoot, and it stores data in a PostgreSQL database.
              </p>
              <div className='get_started'>
                <Link to="/signup" className="btn btn-primary rounded-pill text-white home_button my-4 mb-5">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="col-lg-7 images_center inventory_img">
              <img src={inventory} alt="" className="img-fluid inventory_image rounded p-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
