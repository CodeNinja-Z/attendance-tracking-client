import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import AuthService from "./services/authService"
import { history } from "./helpers/history"

import Login from "./components/Login/Login"
import SignUp from "./components/Signup/SignUp"
import AttendanceLogs from "./components/AttendanceLogs/AttendanceLogs"

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    const user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
    }
  }, [])

  const logOut = () => {
    AuthService.logout()
  }

  const setHomeUrl = () => currentUser ? '/home' : '/login'

  const handleHomeClick = () => {
    if (!currentUser) return alert("Please login or sign up first.")
  }

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={setHomeUrl()} className="navbar-brand" onClick={handleHomeClick}>
            Attendance Tracking
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={setHomeUrl()} className="nav-link" onClick={handleHomeClick}>
                Home
              </Link>
            </li>
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/login"]} component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/home" component={AttendanceLogs} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App