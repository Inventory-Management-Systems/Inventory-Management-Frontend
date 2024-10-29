import React, { useState, useEffect } from 'react';
import '../Style/sidebar.css'
import { useNavigate } from "react-router-dom";

import {
    FaBars,
    // FaExchangeAlt,
    FaShoppingCart,
    FaTh,
    FaUserAlt,
    FaUsers
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const SideBar = ({ children }) => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("employee");
    const toggle = () => setIsOpen(!isOpen);
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = [
        {
            path: '/user/dashboard',
            name: 'Dashboard',
            icon: <FaTh />
        },
        {
            path: '/user/employees',
            name: 'Employees',
            icon: <FaUsers />
        },
        {
            path: '/user/items',
            name: 'Items',
            icon: <FaShoppingCart />
        },
        // {
        //     path: '/user/assign_items',
        //     name: 'Assign Items',
        //     icon: <FaExchangeAlt />
        // },
        {
            path: '/user/profile',
            name: 'Profile',
            icon: <FaUserAlt />
        }
    ];

    const filteredMenuItems = userType === 'admin' ? menuItems : [
        {
            path: '/user/employee_dashboard',
            name: 'Dashboard',
            icon: <FaTh />
        },
        {
            path: '/user/employee_profile',
            name: 'Profile',
            icon: <FaUserAlt />
        }
    ];


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user !== null) {
            setUserType(user.role);
        }
        else {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className='container-fluid'>
            <div style={{ width: isOpen ? '250px' : '50px' }} className='sidebar bg-light shadow-lg'>
                <div className='top_section'>
                    <h1 style={{ display: isOpen ? 'block' : 'none' }} className='logo'>
                        <span style={{ fontSize: '29px', fontFamily: 'arial black', color: '#5e17f0' }}>I</span>
                        <span style={{ fontSize: '29px', fontFamily: 'arial black', color: '#fc466e' }}>M</span>
                        <span style={{ fontSize: '29px', fontFamily: 'arial black', color: '#0cbee2' }}>S</span>
                    </h1>
                    <div style={{ marginLeft: isOpen ? '100px' : '-15px', marginBottom: isOpen ? '10px' : '-40px' }} className='bars text-dark'>
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                <br />
                <div className='type text-dark text-left mx-4' style={{ display: isOpen ? 'block' : 'none' }}>
                    {userType !== "admin" ? "Employee" : "Admin"}
                </div>
                <hr className='text-dark line' />
                {filteredMenuItems.map((item, index) => (
                    <NavLink to={item.path} key={index} className='link' activeclassname='active'>
                        <div className='icon'>{item.icon}</div>
                        <div style={{ display: isOpen ? 'block' : 'none' }} className='link_text'>{item.name}</div>
                    </NavLink>
                ))}
            </div>
            <main>{children}</main>
        </div >
    );

};

export default SideBar;
