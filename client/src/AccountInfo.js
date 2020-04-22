import React from "react";
import { withRouter } from "react-router-dom";

import LibraryItem from './LibraryItem';

import {
    Card,
    CardBody,
} from "reactstrap";

class AccountPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            libraryContents: []
        };
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

    fetchLibrary = async () => {
        
        console.log(this.props);

        const res = await fetch("http://localhost:9000/songInfo/getlibrary/" + this.props.account.username, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then(res => res.json());

        (res.status === "EMPTY") ? 
            console.log("No library content") 
        :
            this.setState(prevState => ({
                libraryContents: [...prevState.libraryContents, res.status]
            }))

        console.log(this.state.libraryContents);
    };

    componentDidMount() {
        this.fetchLibrary(); 
    }

    render() {

        //console.log(this.props);

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

                {/* Library section */}
                <div className="col-md-12 mb-12 comment-block">
                        <h3>In your library:</h3>
                        
                        {this.state.libraryContents[0] ? (

                            <pre>
                                {this.state.libraryContents[0].map(libraryContents => <LibraryItem details = {libraryContents} ></LibraryItem>)}
                            </pre>
                        ) : (
                            <h4>No comments yet!</h4>
                        )}

                    </div>
            </div>
        )
    }
}

export default withRouter(AccountPage);