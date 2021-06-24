document.getElementById('createAccount').addEventListener('click', event => {
  event.preventDefault()
  axios.post('api/users/register', {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  })
    .then(() => window.location = '/login.html')
    .catch(err => console.log(err))
})
