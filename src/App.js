import React from 'react';
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
// import {Switch} from 'react-router-dom/dist/react-router-dom.development'
import './App.css';
import MovieList from './components/MovieList';
import MovieSummary from './components/MovieSummary';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' Component={MovieList}/>
      
      
      
      <Route exact path='/show/:movieId' Component={MovieSummary}/>
        
      </Routes> 
      </Router>
    </div>
  );
}

export default App;
