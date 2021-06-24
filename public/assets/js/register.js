const { default: axios } = require("axios")

document.getElementById('createAccount').addEventListener('click', event => {
  event.preventDefault()
  axios.post('api/users/register', {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  })
    .then(() => {
      axios.post('api/lists', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(() => {
        // this is where we make the new list for the user after they register
      })
      window.location = '/login.html'
    })
    .catch(err => console.log(err))
})
