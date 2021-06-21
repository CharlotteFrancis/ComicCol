//This is a login skeleton
document.getElementById('name of login button').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/users/login', {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  })
    .then(({ data: token }) => {
      if (token) {
        localStorage.setItem('token', token)
        window.location = '/'
      } else {
        alert('Invalid username or password')
      }
    })
    .catch(err => console.error(err))
})

//This is a register skeleton
document.getElementById('name of register button').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/users/register', {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  })
    .then(() => window.location = 'name of window')
    .catch(err => console.error(err))
})