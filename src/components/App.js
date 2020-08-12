import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

// Components
import TopMenuBar from './TopMenuBar';

// Views
import Landing from '../views/Landing';
import LoginPage from '../views/LoginPage';
import JoinPage from '../views/Join';

function App() {
  return (
    <div className="App p-3">
      <TopMenuBar />
        <div>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={LoginPage} />
          <Route path="/join" component={JoinPage} />
        </div>
    </div>
  );
}

export default App;
