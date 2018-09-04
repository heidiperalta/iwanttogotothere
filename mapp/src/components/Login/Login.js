import React, { Component } from "react";
import "./Login.css";
import { post } from '../../helpers/fetchHelper';

class Login extends Component {
  state = {
    errorMessage: ""
  }
  
  loginHandler = (e) => {
    e.preventDefault();

    const { email, password } = this.refs;
    
    const creds = {
      email: email.value,
      password: password.value
    }

    post('/auth/login', creds)
      .then( response => {

        if (response.status !== 200) {
          this.setState({
           errorMessage: response.messages[0]
          });

          return;
        }

        // Set user in App state
        this.props.setUser(response);

      });

  };

  render() {
    return (
      <div className="login-container">
        <span className="error">{this.state.errorMessage}</span>

        <form className="login-form" onSubmit={this.loginHandler}>
          <label for="email">Email</label>
          <input type="email" placeholder="user@email.com" name="email" ref="email" required />

          <label for="password">Password</label>
          <input type="password" name="password" ref="password" required />

          <input type="submit" value="Log me In" />

          <span><a href="/register">...or Register!</a></span>
        </form>
      </div>
    );
  }
}

export default Login;
