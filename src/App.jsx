import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Content from './components/layout/Content';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Content />
      </div>
    </Router>
  );
}
export default App;