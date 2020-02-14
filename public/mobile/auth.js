const loginButton = document.querySelector('.login-button');
const passwordField = document.querySelector('.password');

loginButton.onclick = function () {
  return fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      password: passwordField.value
    })
  })
    .then(res => res.json())
    .then(json => {
      if (json.ok) {
        window.location.href = '/';
      } else {
        if (json.error) {
          alert(json.error);
        } else {
          alert('Failed to log in.');
        }
      }
    })
    .catch(err => {
      alert('Failed to log in.');
      throw new Error(err);
    });
};
