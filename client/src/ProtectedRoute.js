import React from "react";
import { Route, Redirect } from "react-router-dom";

class ProtectedRoute extends React.Component {
  render() {
    const { component: Component, ...props } = this.props

    //console.log(this.props);

    return (
      <Route 
        {...props} 
        render={props => (
          this.props.loggedInStatus === "NOT_LOGGED_IN" ?
            <Component {...props} handleSuccessfulAuth = {this.props.handleSuccessfulAuth}/> :
            <Redirect to='/' />
        )} 
      />
    )
  }
}

export default ProtectedRoute;