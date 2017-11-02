import React, { Component } from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse, Form, FormGroup, Label, Input } from 'reactstrap';

class Header extends Component {
    render() {
        return (
            <Navbar color="faded" light expand="md">
                <NavbarBrand href="/">Centrifuge Truffle Contract Interact</NavbarBrand>
                <NavbarToggler />
                <Collapse isOpen={true} navbar>
                    <Nav className="ml-auto" navbar>

                        <NavItem>
                            <NavLink href="https://rinkeby.etherscan.io">rinkeby.etherscan.io</NavLink>
                        </NavItem>
                    </Nav>
                    <Form inline>
                        <FormGroup>
                            <Label for="selectContract">Contract</Label>
                            <Input type="select" name="select" id="selectContract" onChange={this.props.onSelectContract} value={this.props.selectedContract}>
                                <option value="" ></option>
                                <option value="Entity">Entity</option>
                                <option value="EntityFactory">EntityFactory</option>
                            </Input>
                        </FormGroup>
                    </Form>
                </Collapse>

            </Navbar>

        );
    }
}

export default Header;
