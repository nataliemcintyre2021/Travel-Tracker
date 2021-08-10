//CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/TravelTracker.png';
import './images/logo-travel.png';

import Trips from './Trips';
import Traveler from './Traveler';
import TravelersRepo from './TravelersRepo';

import {getAllTravelersData, getAllTripsData, getAllDestinationsData, postTripData, checkForErrors, displayErrorMessage, getTravelerAtLogin} from './apiCalls';

import {showSelectDestinationOptions, showGreeting, getExpenses, showPending, showUpcoming, showPast, showPresent, showHomePage} from './domUpdates';

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

// const yearExpenses = document.getElementById('yearly-expenses');
const upcomingContainer = document.getElementById('upcoming');
const pastContainer = document.getElementById('past');
const presentContainer = document.getElementById('present');
const pendingContainer = document.getElementById('pending');
// const destinationSelector = document.getElementById('destination-selector');

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


//event listeners

// window.addEventListener('load', fetchData);
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

function logTravelerIn(event) {
  event.preventDefault();
  let theUsername = username.value;
  let modifiedUsername = theUsername.split("").slice(8);
  userNumber = parseInt(modifiedUsername.join(""));
  if ((password.value === "travel") && (userNumber > 0 && userNumber <= 50)) {
    showHomePage();
    fetchData();
  }
}

function fetchData() {
  Promise.all([getAllTravelersData(), getAllTripsData(), getAllDestinationsData()])
  .then(values => parseValues(values))
}

function parseValues(data) {
  allTravelerData = [];
  allTripData = [];
  allDestinationData = [];
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
  currentTraveler = travelersRepo.getDataByTravelerId(userNumber);
  console.log("CURRENT TRAVELER>>>", currentTraveler);
  tripsRepo = new Trips(allTripData);
  getExpenses(tripsRepo, currentTraveler, allDestinationData);
  showSelectDestinationOptions(allDestinationData);
  showGreeting(currentTraveler);
  getPastTrips();
  getPresentTrips();
  getUpcomingTrips();
  getPendingTrips();
}

//**// function showSelectDestinationOptions() {
//   allDestinationData.forEach(destination => {
//     destinationSelector.innerHTML += `<label for="destinations">Select Destination:</label>
//     <select name="destinations"><option value="${destination.destination}" id="${destination.id}">${destination.destination}</option></select`
//   })
//
// }

// function getExpenses() {
//   let userExpenses = tripsRepo.getLastYearsTravelersTripExpenses(currentTraveler.id, allDestinationData)
//   yearExpenses.innerText = `Amount spent on trips this year: $${userExpenses.toFixed(2)}`
//
//   getPastTrips();
//   getPresentTrips();
//   getUpcomingTrips();
//   getPendingTrips();
// }

function getPastTrips() {
  let pastTrips = tripsRepo.getTravelerPastTrips(currentTraveler.id);
  let pastDestinations = tripsRepo.getTravelerPastDestinations(userNumber, allDestinationData);

  let loopCounter = 1;
  pastContainer.innerHTML = '';
  if (pastDestinations.length > 0) {
   pastDestinations.forEach(destination => {
     pastTrips.forEach(trip => {
       if ((destination.id === trip.destinationID) && (trip.status !== "pending")) {
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
       } //else {
       //   pastMessage.innerText = "You have no present trips to display. Head back to the main page to book a new trip!"
       // }
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
   presentContainer.innerHTML = '';
  if (presentDestinations.length > 0) {
   presentDestinations.forEach(destination => {
     presentTrips.forEach(trip => {
       if ((destination.id === trip.destinationID) && (trip.status !== "pending")) {
         presentContainer.innerHTML +=
         `<div class="present-trip-${loopCounter}">
             <img class="present-img-${loopCounter}" id="img" src=${destination.image} alt="${destination.alt}">
             <p class="destination">${destination.destination}</p>
             <section class="trip-info">
                <p class="trip-start-date">Trip Start Date: ${trip.date}</p>
                <p class="trip-duration">Trip Duration: ${trip.duration} days</p>
                <p class="number-of-travelers">Number of Travelers: ${trip.travelers}</p>
              </section>

          </div>`
         loopCounter++;
       } //else {
       //   presentMessage.innerText = "You have no present trips to display. Head back to the main page to book a new trip!"
       // }
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
  upcomingContainer.innerHTML = '';
  if (upcomingDestinations.length > 0) {
  upcomingDestinations.forEach(destination => {
    upcomingTrips.forEach(trip => {
    if ((destination.id === trip.destinationID) && (trip.status !== "pending")) {
    upcomingContainer.innerHTML += `<div class="upcoming-trip-${loopCounter}"><img class="upcoming-img-${loopCounter}" id="img" src=${destination.image} alt="${destination.alt}"><p class="destination">${destination.destination}<p><section class="trip-info"><p class="trip-start-date">Trip Start Date: ${trip.date}</p><p class="trip-duration">Trip Duration: ${trip.duration} days</p><p class="number-of-travelers">Number of Travelers: ${trip.travelers}</p></section></div>`
    loopCounter++;
  } //else {
    //   upcomingMessage.innerText = "You have no upcoming trips to display. Head back to the main page to book a new trip!"
    // }
  })
  })
} else {
      upcomingMessage.innerText = "You have no upcoming trips to display. Head back to the main page to book a new trip!"
    }
}

function getPendingTrips() {
  let pendingTrips = tripsRepo.getTravelerPendingTrips(currentTraveler.id)
  let pendingDestinations = tripsRepo.getTravelerPendingDestinations(currentTraveler.id, allDestinationData);

  let loopCounter = 1;
  // pendingContainer.innerHTML = '';
  if (pendingDestinations.length > 0) {
    pendingDestinations.forEach(destination => {
    pendingTrips.forEach(trip => {
      if (destination.id === trip.destinationID) {
        // pendingContainer.innerHTML = '';
        pendingContainer.innerHTML += `<div class="pending-trip-${loopCounter}"><img class="pending-img-${loopCounter}" id="img" src=${destination.image} alt="${destination.alt}"><p class="destination">${destination.destination}<p><section class="trip-info"><p class="trip-start-date">Trip Start Date: ${trip.date}</p><p class="trip-duration">Trip Duration: ${trip.duration} days</p><p class="number-of-travelers">Number of Travelers: ${trip.travelers}</p></section></div>`;

        loopCounter++;
        // pendingContainer.innerHTML = '';
    }
    // pendingContainer.innerHTML = '';
    })
  })
    // } else {
    //   pendingMessage.innerText = "You have no pending trips to display. Head back to the main page to book a new trip!"
    // }
}
}

  function bookTrip(event) {
    event.preventDefault();

    // let tripIdValue = allTripData.length + 1;
    // let date = dateSelect.value.split("-").join("/");
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

    let tripIdValue = allTripData.length;
    let date = dateSelect.value.split("-").join("/");
    let estimatedCost = '';
    let destinationIdValue = 0;

    allDestinationData.forEach(destination => {
      if (destination["destination"] === destinationSelect.value) {
        destinationIdValue += destination.id;
      }
    })

    let object = { "id": tripIdValue += 1, "userID": currentTraveler.id, "destinationID": destinationIdValue, "travelers": travelersSelect.value, "date": date, "duration": daysSelect.value, "status": "pending", "suggestedActivities": []}

    // bookedTrip.push(object)
    // allTripData.push(object)
    // postTripData(bookedTrip[bookedTrip.length - 1]);
    postTripData(object);
    allTripData.push(object)
    tripForm.reset();
    // tripIdValue += 2;
    fetchData();

    // fetchNewData();
  }



   // function showGreeting() {
   //   greeting.innerText = `Welcome, ${currentTraveler.name}!`
   // }


   // function fetchNewData() {
   //   // allTravelerData = [];
   //   // allTripData = [];
   //   // allDestinationData = [];
   //   Promise.all([getAllTripsData()])
   //   .then(values => allTripData.push(values.newTrip))
   //   createCurrentTravelerAndTrips2()
   //
   //     // console.log("THE VALUES>>>>", values, "All traveler data>>>>", allTravelerData, "All destination data>>>", allDestinationData))
   //   // .then(values => console.log("THE new Values>>>", values))
   // }

   // function parseNewValues(data) {
   //   // allTravelerData = [];
   //   // allTripData = [];
   //   // allDestinationData = [];
   //   // data[0].travelers.forEach(traveler => allTravelerData.push(traveler));
   //   // data[0].travelers.forEach(traveler => {
   //   //   if (!allTravelerData.includes(traveler)) {
   //   //     allTravelerData.push(traveler);
   //   //   }
   //   // })
   // // data[0].trips.forEach(trip => allTripData.push(trip));
   // // let newSet = new Set(allTripData);
   // // allTripData = [...newSet];
   // // console.log(allTripData)
   //   // allTripData.slice(0, 51);
   //   // data[2].destinations.forEach(destination => {
   //   //   if (!allDestinationData.includes(destination)) {
   //   //     allDestinationData.push(destination);
   //   //   }
   //   // })
   //   // data[2].destinations.forEach(destination => allDestinationData.push(destination));
   //   createCurrentTravelerAndTrips2()
   //   // getPendingTrips()
   //   // getPastTrips();
   //   // getPresentTrips();
   //   // getUpcomingTrips();
   //   // getPendingTrips();
   // }

   // function createCurrentTravelerAndTrips2() {
   //   let travelersRepo = new TravelersRepo(allTravelerData);
   //   currentTraveler = travelersRepo.getDataByTravelerId(userNumber);
   //   console.log("CURRENT TRAVELER>>>", currentTraveler);
   //   console.log("******", tripsRepo)
   //   tripsRepo = new Trips(allTripData)
   //   // tripsRepo.data.slice(0, 51);
   //   // console.log("******", theTripsRepo)
   //   // tripsRepo = theTripsRepo.data.slice(0, 51);
   //   console.log("******", tripsRepo)
   //   // tripsRepo.slice(51)
   //   // getPastTrips();
   //   // getPresentTrips();
   //   // getUpcomingTrips();
   //   getPendingTrips();
   // }

   // function fetchTraveler() {
   //   Promise.all([getTravelerAtLogin(userNumber)])
   //   .then(values => console.log(values))
   // }

   // function parseTravelerData() {
   //   data[0]
   // }
