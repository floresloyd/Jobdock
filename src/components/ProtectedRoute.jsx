/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
{/** Creates the protected route class so users can't access other routes unless logged in */}

import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

class ProtectedRoute extends React.Component {
  state = {
    isAuthenticated: false,
    isLoaded: false,
  };

  componentDidMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.setState({
        isAuthenticated: !!user,
        isLoaded: true,
      });
    });
  }

  render() {
    const { isAuthenticated, isLoaded } = this.state;
    const { children } = this.props;

    if (!isLoaded) {
      return <div>Loading...</div>; // Or some other loading indicator
    }

    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    return children;
  }
}

export default ProtectedRoute;
