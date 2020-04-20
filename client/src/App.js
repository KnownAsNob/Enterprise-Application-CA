import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import "./assets/scss/blk-design-system-react.scss";
import "./assets/css/nucleo-icons.css";
import './css/App.css';
import './css/custom.css';

import NavBar from './NavBar';
import Footer from './Footer';
import Homepage from './Homepage';
import CreateAccountPage from './CreateAccount';
import LoginPage from './LoginPage';
import SearchResultsPage from './SearchResultsPage';
import ProtectedRoute from './ProtectedRoute';
import songPage from './songPage';

//chrome://settings/siteData

class App extends React.Component {
  
  constructor(props){
    super();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  
  handleSuccessfulAuth(data) {

    console.log("Successful auth");

    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data
    })
  }

  checkLoginStatus() {
    const res = fetch("http://localhost:9000/account/checkAuth", {
        method: "POST",
        body: JSON.stringify(this.state.values),
        headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    .then(res => res.json()
    .then(data => this.setState({
      loggedInStatus: data.loggedIn,
      user: data.user
    })));
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  signOut() {
    const res = fetch("http://localhost:9000/account/signout", {
      method: "POST",
      body: JSON.stringify(this.state.values),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    .then(this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: ""
    }));
  }

  callAPI(){
    //fetch("http://localhost:9000/apiRun/")
    //.then(res => res.text())
    //.then(res => this.setState({apiResponse: res}));
    const res = fetch("http://localhost:9000/account/", {
      method: "POST",
      body: JSON.stringify(this.state.values),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    .then(res => res.text())
    .then(res => this.setState({apiResponse: res}));
  }

  /*componentDidMount() {
    this.callAPI();
  }*/

  render() {

    return (
      <div className="App">

        <Router>
          <NavBar loggedInStatus = {this.state.loggedInStatus} account = {this.state.user} signout = {this.signOut}/>

          <h1>Status: {this.state.loggedInStatus}</h1>

          <Switch>

            <Route path="/" exact component={Homepage} />
            <ProtectedRoute 
              path="/createAccount" 
              loggedInStatus = {this.state.loggedInStatus} 
              handleSuccessfulAuth = {this.handleSuccessfulAuth}
              component={CreateAccountPage}
            />
            <ProtectedRoute 
              path="/login" 
              loggedInStatus = {this.state.loggedInStatus} 
              handleSuccessfulAuth = {this.handleSuccessfulAuth}
              component={LoginPage}
            />
            <Route exact path="/results" component={SearchResultsPage} />
            <Route exact path="/song/" component={songPage} />

          </Switch>
          
          <Footer />

        </Router>

      </div>
    );
  }
}

export default App;

{/*<ProtectedRoute path='/welcome' loggedInStatus = {this.state.loggedInStatus} component={Welcome} />
<Route path="/login" component={CreateAccountPage} />*/}
