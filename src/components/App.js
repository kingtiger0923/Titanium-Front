import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

// Components
import TopMenuBar from './TopMenuBar';

// Views
import Landing from '../views/Landing';
import LoginPage from '../views/LoginPage';
import AdminLogin from '../views/admin/LoginPage';
import JoinPage from '../views/Join';
import UserDashboard from '../views/Dashboard';

function App() {
  return (
    <div className="App p-3">
      <Route exact path="/" component={TopMenuBar} />
      <Route exact path="/login" component={TopMenuBar} />
      <Route exact path="/join" component={TopMenuBar} />
      <Route exact path="/dashboard" component={TopMenuBar} />
      <div>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/join" component={JoinPage} />
        <Route exact path="/dashboard" component={UserDashboard} />
        <Route exact path="/admin/login" component={AdminLogin} />
      </div>
    </div>
  );
}

export default App;
