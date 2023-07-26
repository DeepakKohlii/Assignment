import React from 'react';
import { BrowserRouter as Router ,Routes , Route } from 'react-router-dom';
import  FirstPage from './FirstPage';
import SecondPage from './SecondPage';

const App = () => {
  return (
    <Router>
          
           <Routes>
                 <Route exact path='/' element={< FirstPage />}></Route>
                 <Route exact path='/second' element={<  SecondPage />}></Route>
                 
          </Routes>
      
       </Router>
  );
};

export default App;