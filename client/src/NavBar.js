import React from "react";

// reactstrap components
import {
  Collapse,
  UncontrolledCollapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  FormGroup,
  Form,
  Input,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";

class NavBar extends React.Component {
    render() {
        return (
            <>
            <Navbar className="bg-success" expand="lg">
                <Container>

                    {/* Brand */}
                    <NavbarBrand href="/">
                        Thoughtify
                    </NavbarBrand>
                    <button
                        className="navbar-toggler"
                        id="navbarColor02"
                        type="button"
                        >
                        <span className="navbar-toggler-bar navbar-kebab" />
                        <span className="navbar-toggler-bar navbar-kebab" />
                        <span className="navbar-toggler-bar navbar-kebab" />
                    </button>

                    {/* Links */}
                    <UncontrolledCollapse navbar toggler="#navbarColor02">
                        <Nav className="mr-auto" navbar>
                            <NavItem className="active">
                                <NavLink href="/">
                                Home <span className="sr-only">(current)</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#pablo" onClick={e => e.preventDefault()}>
                                Features
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/login">
                                Login
                                </NavLink>
                            </NavItem>
                        </Nav>
                        
                        {/* Search */}
                        <Form className="form-inline ml-auto">
                            <FormGroup className="no-border">
                                <Input placeholder="Search" type="text" />
                            </FormGroup>
                        </Form>
                    </UncontrolledCollapse>
                </Container>
            </Navbar>
            </>
        );
    }
}

export default NavBar;
