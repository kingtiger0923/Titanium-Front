import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { POST } from '../api/api';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function LoginPage() {
// Router History
  const history = useHistory();
// Email Validation Reges
  const validEmailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
// States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    console.log(localStorage.savedUserEmail);
    if( localStorage.savedUserEmail ) {
      setEmail(localStorage.savedUserEmail);
      setPassword(localStorage.savedUserPass);
      setRemember(true);
      setError({email: 'T', password: 'T'});
    }
  }, []);

  const ModalClose = () => {
    setModalShow(false);
  };

  const ModalConfirm = () => {
    setModalShow(false);
    history.push('/login');
  }
// Modal Show State
  const [show, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalText] = useState("");
// Handlers
  const handleErrors = (field, val) => {
    switch(field) {
      case 'email':
        if( !validEmailRegex.test(val) ) {
          setError({...error, email: 'Email is not a valid!'});
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
        break;
    }
  }
  const onEmailChange = (e) => {
    setEmail(e.target.value);
    handleErrors('email', e.target.value);
  }
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    handleErrors('password', e.target.value);
  }
  const onRememberChange = (e) => {
    setRemember(e.target.checked);
  }
// Login
  const onLogin = (e) => {
    e.preventDefault();
    
    let url = process.env.REACT_APP_API_URL + '/login';
    POST(url, {
      email,
      password,
      remember
    }).then(res => {
      if( res.data.code === 'success' ) {
        localStorage.setItem('token', res.data.token);
        if( !res.data.admin ) {
          history.push('/dashboard');
        } else {
          history.push('/admin/dashboard');
        }
        if( remember ) {
          localStorage.setItem('savedUserEmail', email);
          localStorage.setItem('savedUserPass', password);
        }
      } else {
        setModalShow(true);
        setModalTitle("Failed");
        setModalText(res.data.message);
      }
    });
  }
  return (
    <div className="login-page">
      <div className="title">
        Welcome To Titanium
      </div>
      <div className="login-form">
        <form>
          <h3 className="text-center p-4">Sign In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter email" 
              onChange={onEmailChange}
              value={email}
            />
            { 
              error.email !== "T" && 
              <span className="error">{error.email}</span> 
            }
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter password" 
              onChange={onPasswordChange}
              value={password}
            />
            { 
              error.password !== "T" && 
              <span className="error">{error.password}</span> 
            }
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input 
                type="checkbox" 
                className="custom-control-input" 
                id="customCheck1" 
                onChange={onRememberChange}
                checked={remember}
              />
              <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            onClick={onLogin}
            disabled={error.email !== "T" || error.password !== "T" }
          >
            Submit
          </button>
          <p className="forgot-password text-right">
            Forgot <Link to="/forgot">password?</Link>
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

export default LoginPage;