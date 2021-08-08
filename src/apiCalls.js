export const getAllTravelersData = () => {
  return fetch('http://localhost:3001/api/v1/travelers')
  .then(response => response.json())
  .then(data => data)
  .catch(err => console.log(err, 'Traveler data error'))
}

export const getAllTripsData = () => {
  return fetch('http://localhost:3001/api/v1/trips')
  .then(response => response.json())
  .then(data => data)
  .catch(err => console.log(err, 'Trip data error'))
}

export const getAllDestinationsData = () => {
  return fetch('http://localhost:3001/api/v1/destinations')
  .then(response => response.json())
  .then(data => data)
  .catch(err => console.log(err, 'Destinations data error'))
}
