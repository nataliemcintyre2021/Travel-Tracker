import Trips from './Trips';
import Traveler from './Traveler';
import TravelersRepo from './TravelersRepo';

import {getAllTravelersData, getAllTripsData, getAllDestinationsData, postTripData, checkForErrors, displayErrorMessage, getTravelerAtLogin} from './apiCalls';

const loginArea = document.getElementById('login-area');
const tripsArea = document.getElementById('trips-area');
const presentArea = document.getElementById('present-area');
const upcomingArea = document.getElementById('upcoming-area');
const pastArea = document.getElementById('past-area');
const pendingArea = document.getElementById('pending-area');


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

  // getPastTrips();
  // getPresentTrips();
  // getUpcomingTrips();
  // getPendingTrips();
}

// export function showPending() {
//   loginArea.classList.add('hidden');
//   tripsArea.classList.add('hidden');
//   pendingArea.classList.remove('hidden')
//   presentArea.classList.add('hidden');
//   upcomingArea.classList.add('hidden');
//   pastArea.classList.add('hidden');
// }

// export function showUpcoming() {
//   loginArea.classList.add('hidden');
//   tripsArea.classList.add('hidden');
//   pendingArea.classList.add('hidden')
//   presentArea.classList.add('hidden');
//   upcomingArea.classList.remove('hidden');
//   pastArea.classList.add('hidden');
// }
//
// export function showPast() {
//   loginArea.classList.add('hidden');
//   tripsArea.classList.add('hidden');
//   pendingArea.classList.add('hidden')
//   presentArea.classList.add('hidden');
//   upcomingArea.classList.add('hidden');
//   pastArea.classList.remove('hidden');
// }
//
// export function showPresent() {
//   loginArea.classList.add('hidden');
//   tripsArea.classList.add('hidden');
//   pendingArea.classList.add('hidden')
//   presentArea.classList.remove('hidden');
//   upcomingArea.classList.add('hidden');
//   pastArea.classList.add('hidden');
// }
//
// export function showHomePage() {
//   console.log("CLICKED")
//   loginArea.classList.add('hidden');
//   tripsArea.classList.add('hidden');
//   pendingArea.classList.add('hidden')
//   presentArea.classList.add('hidden');
//   upcomingArea.classList.add('hidden');
//   pastArea.classList.add('hidden');
//   tripsArea.classList.remove('hidden');
// }
