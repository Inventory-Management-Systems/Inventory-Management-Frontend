import React from 'react'
import '../Style/Style.css';
import { useEffect } from 'react'
import { FaPowerOff } from 'react-icons/fa'


const AssignItems = () => {

    useEffect(() => {
        document.title = "IMS || Assign Items";
    }, []);

    return (
        <div>
            <div className='bg-info div_box'>
                <input type="button" id='logout' className='btn logout' value='logout' />
                <FaPowerOff className='logout_icon' />
            </div>
            <div className='bg-white div_box2 center-box shadow-lg'>
                <h1 className='text-dark'>This is Assign Items</h1>
            </div>
        </div>
    )
}

export default AssignItems
