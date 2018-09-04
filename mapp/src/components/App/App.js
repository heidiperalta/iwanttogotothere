import React, { Component } from "react";
import Sidebar from '../Sidebar/Sidebar';
import Login from '../Login/Login';
import "./App.css";

class App extends Component {
  state = {
    user: null,
    errorMessage: ""
  };

  setUser = (user) => {
    this.setState({ user });
  }

  render() {
    if (!this.state.user) {
      return (
        <div className="main_container">
          <Sidebar />
          <div className="main-content_container">
            <Login setUser={this.setUser} />
          </div>
        </div>
      );
    }

    return (
      <div className="main_container">
        <Sidebar />
        <div className="main-content_container">
        hyieeee
        </div>
      </div>
    );
  }
}

export default App;
