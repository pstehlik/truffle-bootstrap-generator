import React, { Component } from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse } from 'reactstrap';

class Header extends Component {
    render() {
        return (
            <Navbar color="faded" light expand="md">
                <NavbarBrand href="/">Truffle Contract Bootstrap Generator</NavbarBrand>
                <NavbarToggler />
                <Collapse isOpen={true} navbar>
                    <Nav className="ml-auto" navbar>
                        
                        <NavItem>
                            <NavLink href="https://pstehlik.com">Lorem Ipsum Pstehlik Com</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>

        );
    }
}

export default Header;
