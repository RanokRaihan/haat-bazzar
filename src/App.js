import './App.css';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Orders from './components/Orders/Orders';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import { createContext, useState } from 'react';
import PrivetRoute from './components/PrivetRoute/PrivetRoute';
import CheckOut from './components/Checkout/CheckOut';
import ConfirmOrder from './components/ConfirmOrder/ConfirmOrder';

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isSignedIn: false,
    userName: '',
    email: '',
    picture: ''
  })

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <div className="container">
          <Header></Header>
        </div>
        <Switch>
          <Route exact path='/'>
            <div className="container mt-5">
              <Home></Home>
            </div>
          </Route>

          <PrivetRoute path='/orders'>
            <div className="container">
              <Orders></Orders>
            </div>
          </PrivetRoute>

          <Route path='/login'>
            <div className="container">
              <Login></Login>
            </div>
          </Route>

          <PrivetRoute path='/admin'>
            <Admin></Admin>
          </PrivetRoute>

          <PrivetRoute path='/checkOut/:id'>
            <div className="container">
              <CheckOut></CheckOut>
            </div>
          </PrivetRoute>
          <PrivetRoute path='/orderConfirmed'>
            <div className="container">
              <ConfirmOrder></ConfirmOrder>
            </div>
          </PrivetRoute>

        </Switch>

      </Router>
    </userContext.Provider>
  );
}

export default App;
