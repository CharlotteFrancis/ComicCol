// CODE FROM CurrencyConvertor Project - not going to worl
// document.getElementById('login-logout').addEventListener('change', function () {
//   'use strict';
//   let options = ['login', 'logout']
//   options.forEach(option => {
//     if (option === document.getElementById('nav-mobile').value) {
//       document.getElementById(option).parentNode.className = ''
//     } else {
//       document.getElementById(option).parentNode.className = 'inv'
//     }
//   })
// })

  if (localStorage.getItem('token') === true) {
    document.getElementById('logout').parentElement.className = ''
  } else {
    document.getElementById('login').parentElement.className = ''
  }
