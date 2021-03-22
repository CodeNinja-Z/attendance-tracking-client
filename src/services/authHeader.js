const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.auth_token) {
    return user.auth_token 
  } else {
    return ''
  }
}

export default authHeader