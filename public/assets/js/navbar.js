if (localStorage.getItem('token')) {
  document.getElementById('logout').parentElement.className = ''
} else {
  document.getElementById('login').parentElement.className = ''
}

document.getElementById('logout').addEventListener('click', event => {
  localStorage.removeItem('token')
  window.location = '/'
})

// sends email to one of us
document.getElementById('feedbackSubmit').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/email', {
    from: 'feedback@comiccol.com',
    to: 'bronsonp198@gmail.com',
    subject: 'Feedback',
    html: document.getElementById('feedback').value
  })
  .then(email => console.log('Sent email!'))
  .catch(err => console.log(err))
})