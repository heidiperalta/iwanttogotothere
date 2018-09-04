import React, { Component } from 'react';
import './Register.css';
import { post } from '../../helpers/fetchHelper';

class Register extends Component {

  registerUser = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, errorMessage } = this.refs;

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
          response.messages.forEach( message => {
            console.log(message);
            errorMessage.value = message;
          });
          return;
        }

        // get the token from the response and store it in the cookie
        // to extract and send as x-access-token header in subsequent api requests

      });
  }

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
        
        <span className="error" ref="errorMessage"></span>
      </form>
    );
  }
}

export default Register;
