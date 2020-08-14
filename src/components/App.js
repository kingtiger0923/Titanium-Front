import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

// Components
import TopMenuBar from './TopMenuBar';

// Views
import Landing from '../views/Landing';
import LoginPage from '../views/LoginPage';
import JoinPage from '../views/Join';
import UserDashboard from '../views/Dashboard';
import AdminDashboard from '../views/admin/AdminDashboard';
import AdminUsers from '../views/admin/AdminUsers';
import AdminPDF from '../views/admin/AdminPDF';
import AdminMessages from '../views/admin/AdminMessages';
import UserMenuBar from '../components/UserMenuBar';
import PDFs from '../views/Pdfs';
import Links from '../views/Links';
import Messages from '../views/Messages';
import AdminLinks from '../views/admin/AdminLinks';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={TopMenuBar} />
        <Route exact path="/login" component={TopMenuBar} />
        <Route exact path="/join" component={TopMenuBar} />
        <Route exact path="/dashboard" component={UserMenuBar} />
        <Route exact path="/pdfs" component={UserMenuBar} />
        <Route exact path="/links" component={UserMenuBar} />
        <Route exact path="/messages" component={UserMenuBar} />
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/join" component={JoinPage} />
          <Route exact path="/dashboard" component={UserDashboard} />
          <Route exact path="/pdfs" component={PDFs} />
          <Route exact path="/links" component={Links} />
          <Route exact path="/messages" component={Messages} />
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/admin/users" component={AdminUsers} />
          <Route exact path="/admin/pdfs" component={AdminPDF} />
          <Route exact path="/admin/links" component={AdminLinks} />
          <Route exact path="/admin/messages" component={AdminMessages} />
        </div>
      </div>
    );
  }
}

export default App;
