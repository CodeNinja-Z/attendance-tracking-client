import axios from "axios"

const API_URL = 'https://attendance-tracking-api.herokuapp.com/api/v1/'

const signup = (firstName, lastName, email, password, passwordConfirmation) => {
  return axios.post(API_URL + "signup", {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
    password_confirmation: passwordConfirmation
  })
}

const login = (email, password) => {
  return axios
    .post(API_URL + "auth/login", {
      email,
      password
    })
    .then(response => {
      if (response.data.auth_token) {
        localStorage.setItem("user", JSON.stringify(response.data))
      }

      return response.data
    })
}

const logout = () => {
  localStorage.removeItem("user")
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export default {
  signup,
  login,
  logout,
  getCurrentUser
}