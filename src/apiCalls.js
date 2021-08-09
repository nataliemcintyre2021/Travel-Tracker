export const getAllTravelersData = () => {
  return fetch('http://localhost:3001/api/v1/travelers')
  // .then(response => response.json())
  .then(response => checkForErrors(response))
  .then(data => data)
  // .catch(err => console.log(err, 'Traveler data error'))
  .catch(err => displayErrorMessage(err), console.log("Travelers data error"))
}

export const getAllTripsData = () => {
  return fetch('http://localhost:3001/api/v1/trips')
  // .then(response => response.json())
  .then(response => checkForErrors(response))
  .then(data => data)
  // .catch(err => console.log(err, 'Trip data error'))
  .catch(err => displayErrorMessage(err), console.log("Trip data error"))
}

export const getAllDestinationsData = () => {
  return fetch('http://localhost:3001/api/v1/destinations')
  // .then(response => response.json())
  .then(response => checkForErrors(response))
  .then(data => data)
  // .catch(err => console.log(err, 'Destinations data error'))
  .catch(err => displayErrorMessage(err), console.log("Destinations data error"))
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
  .then(json => console.log(json))
  .catch(err => displayErrorMessage(err), console.log("Post trip error"))
}

export const checkForErrors = (response) => {
  console.log(response);
  if (!response.ok) {
    throw new Error(`${response.status} - something went wrong. ${response.statusText}`);
    // displayErrorMessage()
  }
  return response.json()
}

export const displayErrorMessage = (err) => {
  console.log("HERE IN DISPLAY ERROR MESSAGE FUNCTION")
  const errorField = document.getElementById('js-error');
  const message =
    err.message === "Failed to fetch" ? "Something went wrong, please check internet" : err.message;
  errorField.innerText = message;
}
