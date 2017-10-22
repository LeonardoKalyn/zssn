import React from 'react';
import { Nav, Navbar, Button, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const Menu = () => {
    return (
        <Navbar inverse fluid  collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Toggle />
                    <Navbar.Brand>
                        <Link to="/">
                            ZSSN
                        </Link>
                    </Navbar.Brand>
                </Navbar.Header>
                
                <Navbar.Collapse >
                    <Nav>
                        <LinkContainer to="/signup">
                            <NavItem>
                                Sign Up
                            </NavItem>
                        </LinkContainer>
                        
                        <LinkContainer to="/update">
                            <NavItem>
                                Update
                            </NavItem>
                        </LinkContainer>
                        
                        <LinkContainer to="/trade">
                            <NavItem>
                                Trade
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                    
                    <Nav pullRight>
                        <LinkContainer to="/reportinfection">
                            <NavItem>
                                <Button bsStyle="danger">
                                    Report Infection
                                </Button>
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        
    );
};

export default Menu;