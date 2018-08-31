import React, { Component } from 'react';
import './Register.css';
import { post } from '../../helpers/fetchHelper';

class Register extends Component {

  registerUser = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = this.refs;

    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value,
      passwordConfirmation: confirmPassword.value
    }

    try {
      post('/auth/register', newUser)
    } catch (error) {
      console.log(error);
    }
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
      </form>
    );
  }
}

export default Register;
