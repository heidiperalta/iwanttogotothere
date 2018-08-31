import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div className="login-container">
        <form className="login-form">
          <label for="email">Email</label>
          <input type="email" placeholder="user@email.com" name="email" required />

          <label for="password">Password</label>
          <input type="password" name="password" required />

          <input type="submit" value="Log me In" />

          <span><a href="/register">...or Register!</a></span>
        </form>
      </div>
    );
  }
}

export default Login;
