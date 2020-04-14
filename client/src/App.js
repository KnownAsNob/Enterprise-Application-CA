import React from 'react';
//import logo from './logo.svg';
import "./assets/scss/blk-design-system-react.scss";
import "./assets/css/nucleo-icons.css";
import './App.css';

import NavBar from './NavBar';
import Footer from './Footer';
import Homepage from './Homepage';
import LoginPage from './Login';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './css/custom.css';;

//import { render } from '@testing-library/react';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={apiResponse:""};
  }

  callAPI(){
    fetch("http://localhost:9000/")
      .then(res => res.text())
      .then(res => this.setState({apiResponse: res}));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {

    return (
      <div className="App">
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>*/}

        

        {/*<p>
          {this.state.apiResponse}
        </p>
      
        <p>
          <button onClick={sayHello}>Click Me</button>
        </p>*/}

        <Router>
          <NavBar />

            <Switch>
              <Route path="/" exact component={Homepage} />
              <Route path="/login" component={LoginPage} />
            </Switch>

            <Footer />
        </Router>  

      </div>
    );
  }
}

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


*/


export default App;
