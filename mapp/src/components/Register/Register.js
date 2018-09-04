import React, { Component } from 'react';
import './Register.css';
import { post } from '../../helpers/fetchHelper';

class Register extends Component {
  state = {
    messages: []
  };

  registerUser = (e) => {
    e.preventDefault();

    this.state.messages = [];

    const { name, email, password, confirmPassword } = this.refs;

    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value,
      passwordConfirmation: confirmPassword.value
    }

    post('/auth/register', newUser)
      .then( response => {
        if (!response || !response.status) {
          // TODO: an error occurred
          return;
        }

        if (response.status !== 200) {
          this.setState({
            messages: [...response.messages]
          });

          return;
        }

        this.props.history.push('/mplaces');
        // get the token from the response and store it in the cookie
        // to extract and send as x-access-token header in subsequent api requests

      });
  };

  render() {
    return (
      <form className="register-form" onSubmit={this.registerUser}>
        <label>Name</label>
        <input type="text" placeholder="Jane Doe" ref="name" required />

        <label>Email</label>
        <input type="email" placeholder="user@email.com" ref="email" required />

        <label>Password</label>
        <input type="password" ref="password" required />

        <label>Confirm Password</label>
        <input type="password" ref="confirmPassword" required />

        <input type="submit" value="Register!" />
        
        <span className="error"> Please review the following:</span>
        <ul className="error"></ul>
      </form>
    );
  };
}

export default Register;
