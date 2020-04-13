import React from 'react';
import logo from './logo.svg';
import './App.css';
import './Bootstrap/bootstrap/css/bootstrap.min.css'
import './css/custom.css'
import NavBar from './NavBar';
import Footer from './Footer';
import { render } from '@testing-library/react';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={apiResponse:""};
  }

  callAPI(){
    fetch("http://localhost:9000/apiRun/too")
      .then(res => res.text())
      .then(res => this.setState({apiResponse: res}));
  }

  componentWillMount() {
    this.callAPI();
  }

  
  render() {

    function sayHello()
    {
      console.log("Hello there");
    }

    return (
      <div className="App">
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>*/}

        <NavBar />

        <p>
          {this.state.apiResponse}
        </p>
      
        <p>
          <button onClick={sayHello}>Click Me</button>
        </p>
        
        <Footer />  
        
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
}*/


export default App;
