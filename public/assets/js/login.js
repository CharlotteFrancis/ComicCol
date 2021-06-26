document.getElementById('submitLogIn').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/users/login', {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  })
    .then(({ data: token }) => {
      if (token) {
        localStorage.setItem('token', token)
        // makes a new list for current user
        axios.get('/api/users/getID', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(({ data: userID }) => {
            axios.get(`/api/users/${userID}`)
              .then(({ data: user }) => {
                if (user.list == null) {
                  axios.post('/api/lists', {}, {
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                  })
                    .then(() => {
                      console.log('Created new list for current user!')
                      window.location = '/index.html'
                    })
                    .catch(err => console.error(err))
                } else {
                  window.location = '/index.html'
                }
              })
              .catch(err => console.error(err))
          })
          .catch(err => console.error(err))
      }
      else {
        alert('Invalid username or password')
      }
    })
    .catch(err => console.error(err))
})