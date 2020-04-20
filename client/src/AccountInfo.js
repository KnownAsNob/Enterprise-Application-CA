import React from "react";
import { withRouter } from "react-router-dom";

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

    render() {

        console.log(this.props);

        return (

            <div className = "container">
                <h1>Hello</h1>
                <h1>{this.props.loggedInStatus}</h1>
            </div>
        )
    }
}

export default withRouter(AccountPage);