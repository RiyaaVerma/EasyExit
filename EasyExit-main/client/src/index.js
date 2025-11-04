import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Body from './component/Landing , Sign up , Login page/Landing';
import Profile from './component/Profile page/Profile';
import App from './component/Student/App';
import LoginSignup from './component/Landing , Sign up , Login page/login';
import Appg from './component/Guard/App';
import AcceptPage from './component/Guard/AcceptPage';
import Appa from './component/Admin/App';

function Index(){
  return(
    // <Router>
    //   <Routes>
    //     <Route path='/profile' element={<Profile />} />
    //     <Route path='/form' element={<App />} />
    //     <Route path='/guard/verified' element={<Appg  tab="Verified"/>} />
    //     <Route path='/guard/accept' element={<AcceptPage />} />

    //   </Routes>
    // </Router>
    <Router>
    <Routes>
        <Route path='/' element={<Body />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/student'>
          <Route path='' element={<App />} />
        </Route>
        <Route path='/admin'>
          <Route path='' element={<Appa tab="Pending" />} />
          <Route path='accepted' element={<Appa tab="Accepted" />} />
          <Route path='rejected' element={<Appa tab="Rejected" />} />
        </Route>
        <Route path='/guard'>
          <Route path='' element={<Appg  tab="OTPverify"/>} />
          <Route path='verified' element={<Appg  tab="Verified"/>} />
          <Route path='accept' element={<AcceptPage />} />
        </Route>
        {/* <Route path='*' element={<Pagenotfound />} /> */}
      </Routes>
      </Router>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Index />)

