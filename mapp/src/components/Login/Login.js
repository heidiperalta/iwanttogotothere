import React, { Component } from "react";
import "./Login.css";
import { post, setTokenCookie } from '../../helpers/fetchHelper';

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
      .then( res => {

        // Show error message if received
        if (res.messages && res.messages.length) {
          this.setState({
            errorMessage: res.messages[0]
          });

          return;
        }

        if (res.data && res.data.length && res.data[0].token) {
          setTokenCookie(res.data[0].token);
        }
        else {
          this.setState({
            errorMessage: 'Whoops! something went wrong... sorry :('
          });
        }

        // Set user in App state
        this.props.setUser(res.data[0].token);

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
