import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

// reactstrap components
import {
    Button,
    //Collapse,
    UncontrolledCollapse,
    //DropdownToggle,
    //DropdownMenu,
    //DropdownItem,
    //UncontrolledDropdown,
    //FormControl,
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
    
    state = {
        searchText: ""
    };

    handleRoute = route => () => {
        this.props.history.push({ pathname: route });
    };

    handleSearchInput = event => {
        console.log("Handling input");
        this.setState({
            searchText: event.target.value
        });
    };

    handleSearchSubmit = () => {
        if (this.state.searchText) {
            this.props.history.push({
                pathname: "/results",
                state: {
                    searchText: this.state.searchText
                }
            });
        } else {
            alert("Please enter some search text!");
        }
    };
    
    
    
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
                                <Input placeholder="Search" 
                                    type="text"
                                    onChange={this.handleSearchInput}
                                    value={this.state.searchText} 
                                />
                            </FormGroup>
                            <Button onClick={this.handleSearchSubmit} variant="outline-info">
                                Search
                            </Button>
                        </Form>

                    </UncontrolledCollapse>
                </Container>
            </Navbar>
            </>
        );
    }
}

export default withRouter(NavBar);
