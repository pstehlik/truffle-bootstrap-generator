import React, { Component } from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse } from 'reactstrap';

class Header extends Component {
    render() {
        return (
            <Navbar color="faded" light expand="md">
                <NavbarBrand href="/">Truffle Contract Interact</NavbarBrand>
                <NavbarToggler />
                <Collapse isOpen={true} navbar>
                    <Nav className="ml-auto" navbar>

                        <NavItem>
                            <NavLink href="https://rinkeby.etherscan.io">rinkeby.etherscan.io</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>

            </Navbar>

        );
    }
}

export default Header;
