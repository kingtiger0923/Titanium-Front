import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { POST } from '../api/api';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function JoinPage() {
// Router History
  const history = useHistory();
// Email Validation Reges
  const validEmailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
// Input Values as State
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName] = useState('');
  const [email,     setEmail] = useState('');
  const [password,  setPassword] = useState('');
// Modal Show State
  const [show, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalText] = useState("");

  const ModalClose = () => {
    setModalShow(false);
  };

  const ModalConfirm = () => {
    setModalShow(false);
    history.push('/login');
  }
// Validation Result Messages
  const [error, setError] = useState({
    firstName: '', 
    lastName: '', 
    email: '', 
    password: ''
  });
// Input Validation Check
  const handleError = (field, val) => {
    switch(field) {
      case 'firstName':
        if( val.length < 1 ) {
          setError({...error, firstName: 'First Name can not be empty!'});
        } else {
          setError({...error, firstName: 'T'});
        }
        break;
      case 'lastName':
        if( val.length < 1 ) {
          setError({...error, lastName: 'Last Name can not be empty!'});
        } else {
          setError({...error, lastName: 'T'});
        }
        break;        
      case 'email':
        if( !validEmailRegex.test(String(val).toLowerCase()) ) {
          setError({...error, email: 'Email is not valid!'});
        } else {
          setError({...error, email: 'T'});
        }
        break;
      case 'password':
        if( val.length < 8 ) {
          setError({...error, password: 'Password must be at least 8 characters!'});
        } else {
          setError({...error, password: 'T'});
        }
        break;
      default:
    }
  }
// First Name Change
  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
    handleError('firstName', e.target.value);
  }
// Last Name Change
  const onLastNameChanged = (e) => {
    setLastName(e.target.value);
    handleError('lastName', e.target.value);
  }
// Email Change
  const onEmailChanged = (e) => {
    setEmail(e.target.value);
    handleError('email', e.target.value);
  }
// Password Change
  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
    handleError('password', e.target.value);
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
      if( res.data && res.data.code === 'success' ) {
        setModalShow(true);
        setModalTitle("Success");
        setModalText(res.data.message);
      } else {
        setModalShow(true);
        setModalTitle("Failed");
        setModalText(res.data.message);
      }
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
            { 
              error.firstName !== "T" && 
              <span className="error">{error.firstName}</span> 
            }
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input type="text" className="form-control" 
            placeholder="Last name"
            onChange={onLastNameChanged}
            />
            { 
              error.lastName !== "T" && 
              <span className="error">{error.lastName}</span> 
            }
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" 
            placeholder="Enter email"
            onChange={onEmailChanged}/>
            { 
              error.email !== "T" && 
              <span className="error">{error.email}</span> 
            }
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" 
            placeholder="Enter password"
            onChange={onPasswordChanged} />
            { 
              error.password !== "T" && 
              <span className="error">{error.password}</span> 
            }
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block mt-4" 
            onClick={userJoin}
            disabled={error.firstName !== "T" || error.lastName !== "T" || error.email !== "T" || error.password !== "T" }
          >Sign Up</button>
          <p className="forgot-password text-right">
            Already registered <Link to="/login">sign in?</Link>
          </p>
        </form>
      </div>
      <Modal show={show} onHide={ModalClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={ModalConfirm}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default JoinPage;