//CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/TravelTracker.png';
import './images/logo-travel.png';

import Trips from './Trips';
import Traveler from './Traveler';
import TravelersRepo from './TravelersRepo';

import {getAllTravelersData, getAllTripsData, getAllDestinationsData} from './apiCalls';

//global variables
let currentTraveler;
let tripsRepo;
let allTravelerData = [];
let allTripData = [];
let allDestinationData = [];

//querySelectors

const yearExpenses = document.getElementById('yearly-expenses');
const upcomingContainer = document.getElementById('upcoming');
const pastContainer = document.getElementById('past');
const presentContainer = document.getElementById('present');
const destinationSelector = document.getElementById('destination-selector');
const pendingButton = document.getElementById('pending-btn');
const upcomingButton = document.getElementById('upcoming-btn');
const pastButton = document.getElementById('past-btn');
const presentButton = document.getElementById('present-btn');
const logoButton1 = document.getElementById('logo1');
const logoButton2 = document.getElementById('logo2');
const logoButton3 = document.getElementById('logo3');
const logoButton4 = document.getElementById('logo4');
const loginArea = document.getElementById('login-area');
const tripsArea = document.getElementById('trips-area');
const presentArea = document.getElementById('present-area');
const upcomingArea = document.getElementById('upcoming-area');
const pastArea = document.getElementById('past-area');
const pendingArea = document.getElementById('pending-area');
const pastMessage = document.getElementById('past-message');
const upcomingMessage = document.getElementById('upcoming-message');
const presentMessage = document.getElementById('present-message');
const greeting = document.getElementById('greeting');


//event listeners

window.addEventListener('load', fetchData);
pendingButton.addEventListener('click', showPending);
upcomingButton.addEventListener('click', showUpcoming);
pastButton.addEventListener('click', showPast);
presentButton.addEventListener('click', showPresent);
logoButton1.addEventListener('click', showHomePage);
logoButton2.addEventListener('click', showHomePage);
logoButton3.addEventListener('click', showHomePage);
logoButton4.addEventListener('click', showHomePage);

function fetchData() {
  Promise.all([getAllTravelersData(), getAllTripsData(), getAllDestinationsData()])
  .then(values => parseValues(values))
}

function parseValues(data) {
  data[0].travelers.forEach(traveler => allTravelerData.push(traveler));
  data[1].trips.forEach(trip => allTripData.push(trip));
  data[2].destinations.forEach(destination => allDestinationData.push(destination));
  // console.log(allTravelerData)
  // console.log(allTripData)
  // console.log(allDestinationData)
  createCurrentTravelerAndTrips()
}

function createCurrentTravelerAndTrips() {
  let travelersRepo = new TravelersRepo(allTravelerData);
  currentTraveler = travelersRepo.getDataByTravelerId(3);
  console.log("CURRENT TRAVELER>>>", currentTraveler);
  tripsRepo = new Trips(allTripData);
  getExpenses();
  showSelectDestinationOptions();
  showGreeting();
}

function showSelectDestinationOptions() {
  allDestinationData.forEach(destination => {
    destinationSelector.innerHTML += `<label for="destinations">Select Destination:</label>
    <select name="destinations"><option value="Destination">${destination.destination}</option></select`
  })

}

function getExpenses() {
  let userExpenses = tripsRepo.getLastYearsTravelersTripExpenses(currentTraveler.id, allDestinationData)
  yearExpenses.innerText = `Amount spent on trips this year: $${userExpenses.toFixed(2)}`

  getPastTrips();
  getPresentTrips();
  getUpcomingTrips();
}

function getPastTrips() {
  let pastTrips = tripsRepo.getTravelerPastTrips(currentTraveler.id);
  let pastDestinations = tripsRepo.getTravelerPastDestinations(currentTraveler.id, allDestinationData);

  let loopCounter = 1;
  if (pastDestinations.length > 0) {
   pastDestinations.forEach(destination => {
     pastTrips.forEach(trip => {
       if (destination.id === trip.destinationID) {
         pastContainer.innerHTML +=
         `<div class="past-trip-${loopCounter}">
             <img class="upcoming-img-${loopCounter}" id="img" src=${destination.image} alt="${destination.alt}">
             <p class="destination">${destination.destination}</p>
             <section class="trip-info">
                <p class="trip-start-date">Trip Start Date: ${trip.date}</p>
                <p class="trip-duration">Trip Duration: ${trip.duration} days</p>
                <p class="number-of-travelers">Number of Travelers: ${trip.travelers}</p>
              </section>
          </div>`
         loopCounter++;
       }
     })
   })
 } else {
   pastMessage.innerText = "You have no past trips to display. Head back to the main page to book a new trip!"
 }
}

function getPresentTrips() {
  let presentTrips = tripsRepo.getTravelerPresentTrips(currentTraveler.id);
  let presentDestinations = tripsRepo.getTravelerPresentDestinations(currentTraveler.id, allDestinationData);

  let loopCounter = 1;
  if (presentDestinations.length > 0) {
   presentDestinations.forEach(destination => {
     presentTrips.forEach(trip => {
       if (destination.id === trip.destinationID) {
         presentContainer.innerHTML +=
         `<div class="past-trip-${loopCounter}">
             <img class="upcoming-img-${loopCounter}" id="img" src=${destination.image} alt="${destination.alt}">
             <p class="destination">${destination.destination}</p>
             <section class="trip-info">
                <p class="trip-start-date">Trip Start Date: ${trip.date}</p>
                <p class="trip-duration">Trip Duration: ${trip.duration} days</p>
                <p class="number-of-travelers">Number of Travelers: ${trip.travelers}</p>
              </section>

          </div>`
         loopCounter++;
       }
     })
   })
 } else {
   presentMessage.innerText = "You have no present trips to display. Head back to the main page to book a new trip!"
 }
}

function getUpcomingTrips() {
  let upcomingTrips = tripsRepo.getTravelerUpcomingTrips(currentTraveler.id);
  let upcomingDestinations = tripsRepo.getTravelerUpcomingDestinations(currentTraveler.id, allDestinationData);

  let loopCounter = 1;
  if (upcomingDestinations.length > 0) {
  upcomingDestinations.forEach(destination => {
    upcomingTrips.forEach(trip => {
    if (destination.id === trip.destinationID) {
    upcomingContainer.innerHTML += `<div class="upcoming-trip-${loopCounter}"><img class="upcoming-img-${loopCounter}" id="img" src=${destination.image} alt="${destination.alt}"><p class="destination">${destination.destination}<p><section class="trip-info"><p class="trip-start-date">Trip Start Date: ${trip.date}</p><p class="trip-duration">Trip Duration: ${trip.duration} days</p><p class="number-of-travelers">Number of Travelers: ${trip.travelers}</p></section></div>`
    loopCounter++;
    }
  })
  })
    } else {
      upcomingMessage.innerText = "You have no upcoming trips to display. Head back to the main page to book a new trip!"
    }
}

   function showPending() {
     loginArea.classList.add('hidden');
     tripsArea.classList.add('hidden');
     pendingArea.classList.remove('hidden')
     presentArea.classList.add('hidden');
     upcomingArea.classList.add('hidden');
     pastArea.classList.add('hidden');
   }

   function showUpcoming() {
     loginArea.classList.add('hidden');
     tripsArea.classList.add('hidden');
     pendingArea.classList.add('hidden')
     presentArea.classList.add('hidden');
     upcomingArea.classList.remove('hidden');
     pastArea.classList.add('hidden');
   }

   function showPast() {
     loginArea.classList.add('hidden');
     tripsArea.classList.add('hidden');
     pendingArea.classList.add('hidden')
     presentArea.classList.add('hidden');
     upcomingArea.classList.add('hidden');
     pastArea.classList.remove('hidden');
   }

   function showPresent() {
     loginArea.classList.add('hidden');
     tripsArea.classList.add('hidden');
     pendingArea.classList.add('hidden')
     presentArea.classList.remove('hidden');
     upcomingArea.classList.add('hidden');
     pastArea.classList.add('hidden');
   }

   function showHomePage() {
     console.log("CLICKED")
     loginArea.classList.add('hidden');
     tripsArea.classList.add('hidden');
     pendingArea.classList.add('hidden')
     presentArea.classList.add('hidden');
     upcomingArea.classList.add('hidden');
     pastArea.classList.add('hidden');
     tripsArea.classList.remove('hidden');
   }

   function showGreeting() {
     greeting.innerText = `Welcome, ${currentTraveler.name}!`
   }
