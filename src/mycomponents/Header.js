import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
        <Navbar className='bg-info shadow-lg'>
            <Container fluid className='d-flex justify-content-center'>
                <Navbar.Brand>
                    <span style={{ fontSize: '39px', fontFamily: 'arial black' }}>
                        Inventory <span style={{ color: 'black' }}>Management </span>
                        System</span>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;
