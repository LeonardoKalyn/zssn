import React from 'react';
import { Nav, Navbar, Button, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Menu = () => {
    return (
        <Navbar inverse fluid  collapseOnSelect>
            <Navbar.Header>
                <Nav>
                    <NavItem>
                        <LinkContainer to="/">
                            <Navbar.Brand>
                                ZSSN
                            </Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle />
                    </NavItem>
                </Nav>
            </Navbar.Header>
    
            <Navbar.Collapse>
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