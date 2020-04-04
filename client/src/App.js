import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import 'bootstrap/dist/css/bootstrap.css';


import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import MyProfile from "./components/dashboard/MyProfile";
// import EditMyProfile from "./components/dashboard/EditProfile";
import Showpatient from "./components/patients/Showpatient";
import Addpatient from "./components/patients/Addpatient";
import Editpatient from "./components/patients/Editpatient";
import Rendezvous from "./components/rendezvous/Rendezvous";
import Addrendezvous from "./components/rendezvous/Addrendezvous";
import Editrendezvous from "./components/rendezvous/Editrendezvous";


import EditProfile from "./components/edit-profile/EditProfile";



import './App.css';
import { clearCurrentProfile } from "./actions/profileActions";
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    //Clear profile
    store.dispatch(clearCurrentProfile);
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
   
  render() {
    
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
             {/* <Dashboard/> */}
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} /> 
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Switch>
              
              <PrivateRoute exact path="/dashboard/profile"  component={MyProfile}/>
              {/* <PrivateRoute exact path="/dashboard/edit-profile"  component={EditMyProfile}/> */}
              <PrivateRoute exact path="/dashboard/patients"  component={Showpatient}/>
              <PrivateRoute exact path="/dashboard/Addpatient" component={Addpatient} />
              {/* <PrivateRoute exact path="/dashboard/Editpatient" component={Editpatient} /> */}
              <PrivateRoute exact path="/dashboard/Rendezvous" component={Rendezvous} />
              <PrivateRoute exact path="/dashboard/AddRendezvous" component={Addrendezvous} />
              <PrivateRoute exact path="/dashboard/EditRendezvous" component={Editrendezvous} />

             
              <PrivateRoute exact path="/dashboard/editprofile"  component={EditProfile}/>
              <PrivateRoute exact path="/dashboard/editpatient/:id"  component={Editpatient}/>
             </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
