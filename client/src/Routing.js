import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as Layout from "./components";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as API from "./components/api/apiActions";

class Routing extends Component {
 
  async componentDidMount() {
    const { token, user, success } = await API.checkLogin();
    if (success) {
      await this.props.dispatch({
        type: "AUTH_LOGIN",
        payload: { token, user },
      });
      await this.viewCart(user._id);
    }

   
  }
  render() {
    return (
      <div className="container main">
        <Router>
          <Layout.Navbar />
          <Switch>
            <Route exact path="/" component={Layout.Home} />
            <Route path="/adduser" component={Layout.AddUser} />
            <Route
              path="/dashboard"
              component={
                this.props.auth.user.role === "Admin"
                  ? Layout.adminDashboard
                  : Layout.userDashboard
              }
            />
            <Route path="/login" component={Layout.Login} />
            <Route path="/user/:id" component={Layout.Profile} />
          </Switch>
        </Router>
        <Layout.Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Routing);
