import React, { useState, useContext, Component } from "react";


import {
    FormGroup,
    Label,
    Input,
    FormText,
    Button,
    Card,
    CardBody
} from "reactstrap";


class LoginPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            values: {
                username: "",
                email: "",
                password: "",
                password2: ""
            },
            isSubmitting: false,
            isError: false
            
        };
      }


    handleInputChange = e => this.setState({
        values: { ...this.state.values, [e.target.name]: e.target.value }     
    });
  
    submitForm = async e => {
        e.preventDefault();
        this.setState({ isSubmitting: true });

        const res = await fetch("http://localhost:9000/apiRun/createAccount", {
            method: "POST",
            body: JSON.stringify(this.state.values),
            headers: {
                "Content-Type": "application/json"
            }
        });
        

        this.setState({ isSubmitting: false });
        const data = await res.json();
        !data.hasOwnProperty("errors")
        ? this.setState({ message: data.success })
        : this.setState({ message: data.error, isError: true })
        
        console.log("Returned: " + data);
        console.log("Is error? " + this.state.isError);

    };

    render()
    {
        return (
            
            <div className="container">

                <Card>
                    <CardBody>
                        <form onSubmit={this.submitForm}>
                             <FormGroup>
                                <Label for="username">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Enter username"
                                    value={this.state.values.username}
                                    onChange={this.handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Email address</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="exampleEmail"
                                    placeholder="Enter email"
                                    value={this.state.values.email}
                                    onChange={this.handleInputChange}
                                    />
                                <FormText color="muted">
                                    We'll never share your email with anyone else.
                                </FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    autoComplete="off"
                                    value={this.state.values.password}
                                    onChange={this.handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirmPassword">Confirm Password</Label>
                                <Input
                                    type="password"
                                    name="password2"
                                    id="confirmPassword"
                                    placeholder="Confirm your password"
                                    autoComplete="off"
                                    value={this.state.values.password2}
                                    onChange={this.handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" />{' '}
                                        Check me out
                                    <span className="form-check-sign">
                                    <span className="check"></span>
                                    </span>
                                </Label>
                            </FormGroup>
                            <Button color="primary" type="submit">
                                Submit
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        );
    }
};

export default LoginPage;