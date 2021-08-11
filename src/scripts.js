import './css/base.scss';
import './images/logo-travel.png';
import Trips from './Trips';
import TravelersRepo from './TravelersRepo';
import {getAllData, postTripData, checkForErrors, displayErrorMessage} from './apiCalls';
import {showSelectDestinationOptions, showGreeting, getExpenses} from './domUpdates';

//global variables
let currentTraveler;
let userNumber;
let tripsRepo;
let allTravelerData = [];
let allTripData = [];
let allDestinationData = [];
let pendingTrips = [];
let bookedTrip = [];

//querySelectors
const upcomingContainer = document.getElementById('upcoming');
const pastContainer = document.getElementById('past');
const presentContainer = document.getElementById('present');
const pendingContainer = document.getElementById('pending');
const pendingButton = document.getElementById('pending-btn');
const upcomingButton = document.getElementById('upcoming-btn');
const pastButton = document.getElementById('past-btn');
const presentButton = document.getElementById('present-btn');
const logoButton1 = document.getElementById('logo1');
const logoButton2 = document.getElementById('logo2');
const logoButton3 = document.getElementById('logo3');
const logoButton4 = document.getElementById('logo4');
const submitButton = document.getElementById('submit-new');
const submitTripButton = document.getElementById('post-new');
const pastMessage = document.getElementById('past-message');
const upcomingMessage = document.getElementById('upcoming-message');
const presentMessage = document.getElementById('present-message');
const pendingMessage = document.getElementById('pending-message');
const greeting = document.getElementById('greeting');
const dateSelect = document.getElementById('date-select');
const daysSelect = document.getElementById('days-select');
const travelersSelect = document.getElementById('travelers-select');
const destinationSelect = document.getElementById('destination-selector');
const estimatedCostSection = document.getElementById('est-cost');
const tripForm = document.getElementById('trip-form');
const loginForm = document.getElementById('login-form');
const username = document.getElementById('the-username');
const password = document.getElementById('password');
const loginArea = document.getElementById('login-area');
const tripsArea = document.getElementById('trips-area');
const presentArea = document.getElementById('present-area');
const upcomingArea = document.getElementById('upcoming-area');
const pastArea = document.getElementById('past-area');
const pendingArea = document.getElementById('pending-area');
const loginError = document.getElementById('login-error');

//event listeners
pendingButton.addEventListener('click', showPending);
upcomingButton.addEventListener('click', showUpcoming);
pastButton.addEventListener('click', showPast);
presentButton.addEventListener('click', showPresent);
logoButton1.addEventListener('click', showHomePage);
logoButton2.addEventListener('click', showHomePage);
logoButton3.addEventListener('click', showHomePage);
logoButton4.addEventListener('click', showHomePage);
tripForm.addEventListener('submit', bookTrip);
submitTripButton.addEventListener('click', postTrip);
loginForm.addEventListener('submit', logTravelerIn);
submitTripButton.disabled = true;

//functions
function logTravelerIn(event) {
  event.preventDefault();
  let theUsername = username.value;
  let modifiedUsername = theUsername.split("").slice(8);
  userNumber = parseInt(modifiedUsername.join(""));
  if ((password.value === "travel") && (userNumber > 0 && userNumber <= 50)) {
    showHomePage();
    fetchData();
  } else {
    loginError.innerText = `Username or password not valid. Please try again.`
  }
}

function fetchData() {
  Promise.all([getAllData('travelers'), getAllData('trips'), getAllData('destinations')])
  .then(values => parseValues(values))
}

function parseValues(data) {
  allTravelerData = [];
  allTripData = [];
  allDestinationData = [];
  data[0].travelers.forEach(traveler => allTravelerData.push(traveler));
  data[1].trips.forEach(trip => allTripData.push(trip));
  data[2].destinations.forEach(destination => allDestinationData.push(destination));

  createCurrentTravelerAndTrips()
}

function createCurrentTravelerAndTrips() {
  let travelersRepo = new TravelersRepo(allTravelerData);
  currentTraveler = travelersRepo.getDataByTravelerId(userNumber);
  tripsRepo = new Trips(allTripData);
  getExpenses(tripsRepo, currentTraveler, allDestinationData);
  showSelectDestinationOptions(allDestinationData);
  showGreeting(currentTraveler);
  getPastTrips();
  getPresentTrips();
  getUpcomingTrips();
  getPendingTrips();
}

function fetchNewData() {
  Promise.all([getAllData('travelers'), getAllData('trips'), getAllData('destinations')])
  .then(values => parseNewValues(values))
}

function parseNewValues(data) {
  allTravelerData = [];
  allTripData = [];
  allDestinationData = [];
  data[0].travelers.forEach(traveler => allTravelerData.push(traveler));
  data[1].trips.forEach(trip => allTripData.push(trip));
  data[2].destinations.forEach(destination => allDestinationData.push(destination));

  let travelersRepo = new TravelersRepo(allTravelerData);
  currentTraveler = travelersRepo.getDataByTravelerId(userNumber);
  tripsRepo = new Trips(allTripData);

  getPastTrips();
  getPresentTrips();
  getUpcomingTrips();
  getPendingTrips();
}

function getPastTrips() {
  let pastTrips = tripsRepo.getTravelerPastTrips(currentTraveler.id);
  let pastDestinations = tripsRepo.getTravelerPastDestinations(userNumber, allDestinationData);

  pastContainer.innerHTML = '';
  if (pastDestinations.length > 0) {
   pastDestinations.forEach(destination => {
     pastTrips.forEach(trip => {
       if ((destination.id === trip.destinationID) && (trip.status !== "pending")) {
         pastContainer.innerHTML +=
         `<div class="past-trip">
             <img class="upcoming-img" id="img" src=${destination.image} alt="${destination.alt}">
             <p class="destination">${destination.destination}</p>
             <section class="trip-info">
                <p class="trip-start-date">Trip Start Date: ${trip.date}</p>
                <p class="trip-duration">Trip Duration: ${trip.duration} days</p>
                <p class="number-of-travelers">Number of Travelers: ${trip.travelers}</p>
              </section>
          </div>`
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

  presentContainer.innerHTML = '';
  if (presentDestinations.length > 0) {
   presentDestinations.forEach(destination => {
     presentTrips.forEach(trip => {
       if ((destination.id === trip.destinationID) && (trip.status !== "pending")) {
         presentContainer.innerHTML +=
         `<div class="present-trip">
             <img class="present-img" id="img" src=${destination.image} alt="${destination.alt}">
             <p class="destination">${destination.destination}</p>
             <section class="trip-info">
                <p class="trip-start-date">Trip Start Date: ${trip.date}</p>
                <p class="trip-duration">Trip Duration: ${trip.duration} days</p>
                <p class="number-of-travelers">Number of Travelers: ${trip.travelers}</p>
              </section>
          </div>`
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

  upcomingContainer.innerHTML = '';
  if (upcomingDestinations.length > 0) {
  upcomingDestinations.forEach(destination => {
    upcomingTrips.forEach(trip => {
    if ((destination.id === trip.destinationID) && (trip.status !== "pending")) {
    upcomingContainer.innerHTML += `<div class="upcoming-trip"><img class="upcoming-img" id="img" src=${destination.image} alt="${destination.alt}"><p class="destination">${destination.destination}<p><section class="trip-info"><p class="trip-start-date">Trip Start Date: ${trip.date}</p><p class="trip-duration">Trip Duration: ${trip.duration} days</p><p class="number-of-travelers">Number of Travelers: ${trip.travelers}</p></section></div>`
  }
  })
  })
} else {
      upcomingMessage.innerText = "You have no upcoming trips to display. Head back to the main page to book a new trip!"
    }
}

function getPendingTrips() {
  let pendingTrips = tripsRepo.getTravelerPendingTrips(currentTraveler.id)
  let pendingDestinations = tripsRepo.getTravelerPendingDestinations(currentTraveler.id, allDestinationData);

  pendingContainer.innerHTML = '';
  if (pendingDestinations.length > 0) {
    pendingDestinations.forEach(destination => {
    pendingTrips.forEach(trip => {
      if (destination.id === trip.destinationID) {
        pendingContainer.innerHTML += `<div class="pending-trip"><img class="pending-img" id="img" src=${destination.image} alt="${destination.alt}"><p class="destination">${destination.destination}<p><section class="trip-info"><p class="trip-start-date">Trip Start Date: ${trip.date}</p><p class="trip-duration">Trip Duration: ${trip.duration} days</p><p class="number-of-travelers">Number of Travelers: ${trip.travelers}</p></section></div>`;
    }
    })
  })
}
}

  function bookTrip(event) {
    event.preventDefault();
    let estimatedCost = '';
    let destinationIdValue = 0;

    allDestinationData.forEach(destination => {
      if (destination["destination"] === destinationSelect.value) {
        destinationIdValue += destination.id;
        let travelAgentFee = estimatedCost * .1
        let travelCosts = ((travelersSelect.value * destination.estimatedFlightCostPerPerson) + (daysSelect.value * destination.estimatedLodgingCostPerDay));

        estimatedCost = (travelCosts + travelAgentFee).toFixed(2);
      }
    })

    estimatedCostSection.innerText = `Trips estimated cost is $${estimatedCost}`
    submitTripButton.disabled = false;
  }

  function postTrip(event) {
    event.preventDefault();
    let date = dateSelect.value.split("-").join("/");
    let destinationIdValue = 0;

    allDestinationData.forEach(destination => {
      if (destination["destination"] === destinationSelect.value) {
        destinationIdValue += destination.id;
      }
    })

    let object = { "id": Date.now(), "userID": currentTraveler.id, "destinationID": destinationIdValue, "travelers": parseInt(travelersSelect.value), "date": date, "duration": parseInt(daysSelect.value), "status": "pending", "suggestedActivities": []}
    postTripData(object);
    tripForm.reset();
  }

  function showPending() {
    fetchNewData()
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
    loginArea.classList.add('hidden');
    tripsArea.classList.add('hidden');
    pendingArea.classList.add('hidden')
    presentArea.classList.add('hidden');
    upcomingArea.classList.add('hidden');
    pastArea.classList.add('hidden');
    tripsArea.classList.remove('hidden');
  }
