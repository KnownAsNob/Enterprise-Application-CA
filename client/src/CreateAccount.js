import React from "react";
import { withRouter } from "react-router-dom";

import {
    FormGroup,
    Label,
    Input,
    FormText,
    Button,
    NavLink,
    Card,
    CardBody
} from "reactstrap";


class CreateAccountPage extends React.Component {

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

        const res = await fetch("http://localhost:9000/account/createAccount", {
            method: "POST",
            body: JSON.stringify(this.state.values),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        
        

        this.setState({ isSubmitting: false });
        const data = await res.json();
        
        if(!data.hasOwnProperty("errors"))
        {
            this.props.handleSuccessfulAuth(data)
        }

        else {
            this.setState({ message: data.error, isError: true })
        }
        
        console.log("Returned: " + data);
        console.log("Is error? " + this.state.isError);

        this.props.history.push({pathname: "/"});

        //? this.setState({ message: data.success })
    };

    render()
    {
        return (
            
            <div className="container">

                <h2>Create Account</h2>

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
                            {/*<FormGroup check>
                                <Label check>
                                    <Input type="checkbox" />{' '}
                                        Check me out
                                    <span className="form-check-sign">
                                    <span className="check"></span>
                                    </span>
                                </Label>
                            </FormGroup>*/}
                            <Button color="success" type="submit">
                                Submit
                            </Button>
                        </form>
                        <NavLink href="/login">Have an account?</NavLink>
                    </CardBody>
                </Card>
            </div>
        );
    }
};

export default withRouter(CreateAccountPage);