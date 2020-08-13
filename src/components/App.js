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
import AdminDashboard from '../views/admin/AdminDashboard';
import AdminUsers from '../views/admin/AdminUsers';
import AdminUploads from '../views/admin/AdminUploads';
import AdminMessages from '../views/admin/AdminMessages';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={TopMenuBar} />
        <Route exact path="/login" component={TopMenuBar} />
        <Route exact path="/join" component={TopMenuBar} />
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/join" component={JoinPage} />
          <Route exact path="/dashboard" component={UserDashboard} />
          <Route exact path="/admin" component={AdminLogin} />
          <Route exact path="/admin/login" component={AdminLogin} />
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/admin/users" component={AdminUsers} />
          <Route exact path="/admin/uploads" component={AdminUploads} />
          <Route exact path="/admin/messages" component={AdminMessages} />
        </div>
      </div>
    );
  }
}

export default App;
