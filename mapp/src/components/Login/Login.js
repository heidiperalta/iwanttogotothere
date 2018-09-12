import React, { Component } from "react";
import "./Login.css";
import { post, setTokenCookie } from '../../helpers/fetchHelper';

class Login extends Component {
  state = {
    errorMessage: ""
  }

  setErrorMessage = (message) => {
    this.setState({
      errorMessage: message || 'Whoops! something went wrong... sorry :('
    });
  };
  
  loginHandler = async (e) => {
    e.preventDefault();

    const { email, password } = this.refs;
    
    const creds = {
      email: email.value,
      password: password.value
    }

    const loginRes = await post('/auth/login', creds);

    if (!loginRes) {
      this.setErrorMessage();
      return;
    }

    // Show error message if received
    if (loginRes.messages && loginRes.messages.length) {
      this.setErrorMessage(loginRes.messages[0]);
      return;
    }

    // Set token cookie for subsequent api requests
    if (loginRes.data && loginRes.data.length && loginRes.data.token) {
      setTokenCookie(loginRes.data.token);

      this.props.setUser(loginRes.data.user);
    }
    else {
      this.setErrorMessage();
    }

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
