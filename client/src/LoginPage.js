import React from "react";
import { withRouter } from "react-router-dom";

import {
    FormGroup,
    Label,
    Input,
    FormText,
    NavLink,
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
            isError: false,
            errorMsg: ""
        };
    }

    handleInputChange = e => this.setState({
        values: { ...this.state.values, [e.target.name]: e.target.value }     
    });
  
    submitForm = async e => {
        e.preventDefault();
        this.setState({ isSubmitting: true });

        const res = await fetch("http://localhost:9000/account/login", {
            method: "POST",
            body: JSON.stringify(this.state.values),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        
        this.setState({ isSubmitting: false });
        const data = await res.json();
        
        if(!data.hasOwnProperty("errors")) {
            this.props.handleSuccessfulAuth(data);
            this.props.history.push({pathname: "/"});
        }

        else {
            this.setState({ message: data.error, isError: true, errorMsg: "We don't recognize those details. Have another go!" })
        }
        
        console.log("Returned: " + data);
        console.log("Is error? " + this.state.isError);

        //this.props.history.push({pathname: "/"});
    };

    render()
    {
        return (
            
            <div className="container">

                <h2>Login</h2>
                
                <p>{this.state.errorMsg}</p>

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
                            <Button color="success" type="submit">
                                Submit
                            </Button>
                        </form>
                        <NavLink href="/createAccount">Need an account?</NavLink>
                    </CardBody>
                </Card>
            </div>
        );
    }
};

export default withRouter(LoginPage);