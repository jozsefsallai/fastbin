const saveButton = document.querySelector('.save-button');
const editor = document.querySelector('.editor');

saveButton.onclick = function () {
  fetch('/documents', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'text/plain'
    },
    credentials: 'same-origin',
    body: editor.value
  })
    .then(res => res.json())
    .then(json => {
      if (json.ok) {
        window.location.href = '/' + json.key;
      } else {
        if (json.error) {
          alert(json.error);
        } else {
          alert('Something bad happened.');
        }
      }
    })
    .catch(err => {
      alert('Something bad happened.');
      throw new Error(err);
    });
};
