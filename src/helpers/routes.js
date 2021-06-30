import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

// Public Routes
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import NotFound from "../pages/public/NotFound";
// Protected Routes
import Dashboard from "../pages/private/Dashboard";
import Products from "../pages/private/Products";
import Users from "../pages/private/Users";

const Routes = (props) => {
  return (
    <React.Fragment>
      <Router {...props}>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route exact path="/" component={Dashboard}></Route>
          <Route path="/products" component={Products}></Route>
          <Route path="/users" component={Users}></Route>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default Routes;