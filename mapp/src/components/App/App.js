import React, { Component } from "react";
import Sidebar from '../Sidebar/Sidebar';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="main_container">
        <Sidebar />
        <div className="main-content_container">
        </div>
      </div>
    );
  }
}

export default App;
