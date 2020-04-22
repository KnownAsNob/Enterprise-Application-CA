import React from "react";
import { withRouter } from "react-router-dom";

import {
    FormGroup,
    Label,
    Input,
    NavLink,
    Button,
    Card,
    CardBody,
    Alert
} from "reactstrap";

class AccountPage extends React.Component {
    
    constructor(props){
        super(props);
        /*this.state = {
            values: {
                username: "",
                email: "",
                password: "",
                password2: ""
            },
            isSubmitting: false,
            isError: false
        };*/
    }

    deleteAccount = async () => {
        console.log("Deleting account...");
        
        let username = this.props.account.username;

        this.props.signout();

        const res = await fetch("http://localhost:9000/account/delete/" + username, 
            {
                method: "GET",
                headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(res => res.json());

        this.props.history.push({
            pathname: "/"});
    }

    render() {

        console.log(this.props);

        return (

            <div className = "container">
                <h1>Your Account</h1>
                <Card>
                    <CardBody>
                        <h4>Username: {this.props.account.username}</h4>
                        <h4>Email: {this.props.account.email}</h4>
                    </CardBody>
                </Card>
                
                <button className="btn btn-danger btn-sm" onClick={this.deleteAccount}>Delete Account</button>
            </div>
        )
    }
}

export default withRouter(AccountPage);