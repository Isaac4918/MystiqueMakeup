import React from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";


function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

const About = () => {<div>
  <h1>About</h1>
</div>}


function App() {
  return (
    <div>
      <h1>
      test
      </h1>
      <BrowserRouter>
        <Routes>
          <Route path="/app" component={Home} />
          <Route path="/about" component={About} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}


export default App;