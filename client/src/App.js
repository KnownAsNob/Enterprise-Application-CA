import React from "react";
//import logo from './logo.svg';
import "./assets/scss/blk-design-system-react.scss";
import "./assets/css/nucleo-icons.css";
import './App.css';

//chrome://settings/siteData

import NavBar from './NavBar';
import Footer from './Footer';
import Homepage from './Homepage';
import LoginPage from './Login';
import SearchResultsPage from './SearchResultsPage';

import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';

import './css/custom.css';;

//import { render } from '@testing-library/react';


class App extends React.Component {
  
  constructor(props){
    super();
    //this.state={apiResponse:""};
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }
  
  handleSuccessfulAuth(data) {

    console.log("Successful auth");
    //this.props.history.push("/");
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data
    })
  }

  checkLoginStatus() {
    const res = fetch("http://localhost:9000/apiRun/checkAuth", {
        method: "POST",
        body: JSON.stringify(this.state.values),
        headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    .then(res => res.json()
    //.then(console.log(res));
    .then(data => this.setState({
      loggedInStatus: data.loggedIn,
      user: data.user
    })));
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  callAPI(){
    //fetch("http://localhost:9000/apiRun/")
      //.then(res => res.text())
      //.then(res => this.setState({apiResponse: res}));
      const res = fetch("http://localhost:9000/apiRun/", {
            method: "POST",
            body: JSON.stringify(this.state.values),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(res => res.text())
        .then(res => this.setState({apiResponse: res}));
  }

  /*componentDidMount() {
    this.callAPI();
  }*/

  render() {
    
    return (
      <div className="App">

        <Router>
          <NavBar />

          <h1>Status: {this.state.loggedInStatus}</h1>

          <Switch>
            <Route path="/" exact component={Homepage} />
            {/*<Route path="/login" component={LoginPage} />*/}
            <Route 
              path="/login" 
              render = {props => (
                  <LoginPage {... props} loggedInStatus = {this.state.loggedInStatus} handleSuccessfulAuth = {this.handleSuccessfulAuth}/>
                )
              }
            />
            <Route exact path="/results" component={SearchResultsPage} />
          </Switch>

          <Footer />
        </Router>

      </div>
    );
  }
}
//}

export default App;
