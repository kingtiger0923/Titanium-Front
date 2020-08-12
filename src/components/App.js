import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';

// Components
import TopMenuBar from './TopMenuBar';

// Views
import Landing from '../views/Landing';

function App() {
  return (
    <div className="App p-3">
      <TopMenuBar />
      <Router>
        <div>
          <Route exact path="/" component={Landing} />
        </div>
      </Router>
    </div>
  );
}

export default App;
