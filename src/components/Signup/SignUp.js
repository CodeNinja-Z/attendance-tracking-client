import React, { useState, useRef } from "react"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import { isEmail } from "validator"

import AuthService from "../../services/authService"

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    )
  }
}

const vname = (value) => {
  if (value.length < 2 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The first/last name must be between 2 and 40 characters.
      </div>
    )
  }
}

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    )
  }
}

const SignUp = (props) => {
  const form = useRef()
  const checkBtn = useRef()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [successful, setSuccessful] = useState(false)
  const [message, setMessage] = useState("")

  const onChangeFirstName = (e) => {
    const firstName = e.target.value
    setFirstName(firstName)
  }

  const onChangeLastName = (e) => {
    const lastName = e.target.value
    setLastName(lastName)
  }

  const onChangeEmail = (e) => {
    const email = e.target.value
    setEmail(email)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const onChangePasswordConfirmation = (e) => {
    const passwordConfirmation = e.target.value
    setPasswordConfirmation(passwordConfirmation)
  }

  const handleSignup = (e) => {
    e.preventDefault()

    setMessage("")
    setSuccessful(false)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.signup(firstName, lastName, email, password, passwordConfirmation).then(
        (response) => {
          setMessage(response.data.message)
          setSuccessful(true)

          if (response.data.auth_token) {
            localStorage.setItem("user", JSON.stringify(response.data))
          }

          props.history.push("/home")
          window.location.reload()
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          setMessage(resMessage)
          setSuccessful(false)
        }
      )
    }
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleSignup} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">First Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={onChangeFirstName}
                  validations={[required, vname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Last Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={onChangeLastName}
                  validations={[required, vname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password-confirmation">Password Confirmation</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password-confirmation"
                  value={passwordConfirmation}
                  onChange={onChangePasswordConfirmation}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  )
}

export default SignUp