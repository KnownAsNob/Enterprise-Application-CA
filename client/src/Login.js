import React from "react";
import './css/loginForms.css'


class LoginPage extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            values: {
                email: "",
                password: ""
            },
            isSubmitting: false,
            isError: false
        };
      }
    
    render() {
        return (
            
            <div className="container">
                
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-signin flex-row my-5">
                        <div className="card-img-left d-none d-md-flex">
                            
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-center">Register</h5>
                            
                            <form id="registerSubmit" className="form-signin">
                                <div className="form-label-group">
                                    <input type="text" id="inputUserame" className="form-control" placeholder="Username" required autofocus></input>
                                    <label for="inputUserame">Username</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required></input>
                                    <label for="inputEmail">Email address</label>
                                </div>
                                
                                <hr></hr>

                                <div className="form-label-group">
                                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required></input>
                                    <label for="inputPassword">Password</label>
                                </div>
                                
                                <div className="form-label-group">
                                    <input type="password" id="inputConfirmPassword" className="form-control" placeholder="Password" required></input>
                                    <label for="inputConfirmPassword">Confirm password</label>
                                </div>

                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" >Register</button>
                                <a className="d-block text-center mt-2 small" href="#">Sign In</a>
                                <hr className="my-4"></hr>
                                <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2"></i> Sign up with Google</button>
                                <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2"></i> Sign up with Facebook</button>
                            </form>
                        
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        
        );
    }
}
    
export default LoginPage;