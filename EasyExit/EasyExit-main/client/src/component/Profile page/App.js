// App.js
import React from 'react';
import Profile from './Profile';

function App  ()  {
  return (
    <div>
      <Profile />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App/>)


// terminal Commands
// npm init -y   // if you haven't initialized your project with a package.json file
// npm install react react-dom ./client
// npm start
