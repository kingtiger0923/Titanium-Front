import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { POST } from '../api/api';

function JoinPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName] = useState('');
  const [email,     setEmail] = useState('');
  const [password,  setPassword] = useState('');
  const [error, setError] = useState({firstName: '', lastname: '', email: '', password: ''});

  const handleError = (field) => {
    switch(field) {
      case 'firstName':
        break;
      case 'lastName':
        break;        
      case 'lastName':
        break;
      case 'lastName':
        break;
    }
  }

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const onLastNameChanged = (e) => {
    setLastName(e.target.value);
  }

  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  }

  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  }

  const userJoin = function(e) {
    e.preventDefault();
    let url = process.env.REACT_APP_API_URL + '/join';

    POST(url, {
      firstName,
      lastName,
      email,
      password
    }).then((res) => {
      console.log(res);
    })

  }

  return (
    <div className="join-page">
      <div className="title">
        Welcome To Titanium
      </div>
      <div className="join-form">
        <form>
          <h3 className="text-center p-4">Sign Up</h3>

          <div className="form-group">
            <label>First name</label>
            <input type="text" className="form-control" 
            placeholder="First name" 
            onChange={onFirstNameChange}/>
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input type="text" className="form-control" 
            placeholder="Last name"
            onChange={onLastNameChanged}
            />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" 
            placeholder="Enter email"
            onChange={onEmailChanged}/>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" 
            placeholder="Enter password"
            onChange={onPasswordChanged} />
          </div>

          <button type="submit" className="btn btn-primary btn-block mt-4" onClick={userJoin}>Sign Up</button>
          <p className="forgot-password text-right">
            Already registered <Link to="/login">sign in?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default JoinPage;