if (localStorage.getItem('token')) {
  document.getElementById('logout').parentElement.className = ''
} else {
  document.getElementById('login').parentElement.className = ''
}

document.getElementById('logout').addEventListener('click', event => {
  localStorage.removeItem('token')
  window.location = '/'
})
