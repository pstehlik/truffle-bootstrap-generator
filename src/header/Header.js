import React, { Component } from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse } from 'reactstrap';

import './Header.css'

class Header extends Component {
    render() {
        return (
            <Navbar color="faded" light expand="md">
                <NavbarBrand href="/"><div class="spinner"> <div class="spinnerText">Truffle Contract Interact</div></div></NavbarBrand>
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
