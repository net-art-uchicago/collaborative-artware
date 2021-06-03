/* global */

const button = document.querySelector('#submit')
const username = document.querySelector('#username')
const password = document.querySelector('#password')

button.addEventListener('click', () => {
  const opts = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  }
  window.fetch('/api/login', opts)
    .then((res) => res.json())
    .then((json) => console.log(json))
})
