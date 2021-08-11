export const getAllData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
  .then(response => checkForErrors(response))
  .then(data => data)
  .catch(err => {
    displayErrorMessage(err)
    console.log(`${type} data error`)
  })
}

export const postTripData = (object) => {
  return fetch ('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => checkForErrors(response))
  .then(json => json)
  .catch(err => {
    displayErrorMessage(err)
    console.log("Post trip error")
  })
}

export const checkForErrors = (response) => {
  if (!response.ok) {
    throw new Error(`${response.status} - something went wrong. ${response.statusText}`);
  }
  return response.json()
}

export const displayErrorMessage = (err) => {
  const errorField = document.getElementById('js-error');
  const message =
    err.message === "Failed to fetch" ? "Something went wrong, please check internet" : err.message;
  errorField.innerText = message;
}
