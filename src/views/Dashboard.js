import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { POST } from '../api/api';

function Dashboard() {
// history Object
  const history = useHistory();

  useEffect(() => {
    if( localStorage.getItem('token') === null ) {
      history.push('/login');
    } else {
      // Get State with token
      const url = process.env.REACT_APP_API_URL + '/verifytoken';
      POST(url, {
        token: localStorage.getItem('token')
      }).then((res) => {
        console.log(res.data);
      })
      
    }
  }, []);

  return (
    <div className="landing">
      <h1>Dashboard is Coming soon</h1>
    </div>
  );
}

export default Dashboard;