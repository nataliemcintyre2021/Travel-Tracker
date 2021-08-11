import Trips from './Trips';
import Traveler from './Traveler';
import TravelersRepo from './TravelersRepo';

import {getAllTravelersData, getAllTripsData, getAllDestinationsData, postTripData, checkForErrors, displayErrorMessage, getTravelerAtLogin} from './apiCalls';

export function showSelectDestinationOptions(data) {
  const destinationSelector = document.getElementById('destination-selector');
  data.forEach(destination => {
    destinationSelector.innerHTML += `<label for="destinations">Select Destination:</label>
    <select name="destinations"><option value="${destination.destination}" id="${destination.id}">${destination.destination}</option></select`
  })
}

export function showGreeting(traveler) {
  greeting.innerText = `Welcome, ${traveler.name}!`
}

export function getExpenses(theTripsRepo, traveler, destinationData) {
  const yearExpenses = document.getElementById('yearly-expenses');
  let userExpenses = theTripsRepo.getLastYearsTravelersTripExpenses(traveler.id, destinationData)
  yearExpenses.innerText = `Amount spent on trips this year: $${userExpenses.toFixed(2)}`
}
