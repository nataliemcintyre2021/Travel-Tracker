//CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/TravelTracker.png';
import './images/logo-travel.png';

import Trips from './Trips';
import Traveler from './Traveler';
import TravelersRepo from './TravelersRepo';

import {getAllTravelersData, getAllTripsData, getAllDestinationsData, postTripData, checkForErrors, displayErrorMessage} from './apiCalls';

//global variables
let currentTraveler;
let tripsRepo;
let allTravelerData = [];
let allTripData = [];
let allDestinationData = [];
let pendingTrips = [];
let bookedTrip = [];

//querySelectors

const yearExpenses = document.getElementById('yearly-expenses');
const upcomingContainer = document.getElementById('upcoming');
const pastContainer = document.getElementById('past');
const presentContainer = document.getElementById('present');
const pendingContainer = document.getElementById('pending');
const destinationSelector = document.getElementById('destination-selector');

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

const loginArea = document.getElementById('login-area');
const tripsArea = document.getElementById('trips-area');
const presentArea = document.getElementById('present-area');
const upcomingArea = document.getElementById('upcoming-area');
const pastArea = document.getElementById('past-area');
const pendingArea = document.getElementById('pending-area');

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
// submitButton.addEventListener('click', bookTrip);
tripForm.addEventListener('submit', bookTrip);
submitTripButton.addEventListener('click', postTrip);
// dateSelect.addEventListener('change', buttonEnable);
// daysSelect.addEventListener('change', buttonEnable);
// travelersSelect.addEventListener('change', buttonEnable);
// destinationSelect.addEventListener('change', buttonEnable);

submitTripButton.disabled = true;

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
  currentTraveler = travelersRepo.getDataByTravelerId(18);
  console.log("CURRENT TRAVELER>>>", currentTraveler);
  tripsRepo = new Trips(allTripData);
  getExpenses();
  showSelectDestinationOptions();
  showGreeting();
}

function showSelectDestinationOptions() {
  allDestinationData.forEach(destination => {
    destinationSelector.innerHTML += `<label for="destinations">Select Destination:</label>
    <select name="destinations"><option value="${destination.destination}" id="${destination.id}">${destination.destination}</option></select`
  })

}

function getExpenses() {
  let userExpenses = tripsRepo.getLastYearsTravelersTripExpenses(currentTraveler.id, allDestinationData)
  yearExpenses.innerText = `Amount spent on trips this year: $${userExpenses.toFixed(2)}`

  getPastTrips();
  getPresentTrips();
  getUpcomingTrips();
  getPendingTrips();
}

function getPastTrips() {
  let pastTrips = tripsRepo.getTravelerPastTrips(currentTraveler.id);
  let pastDestinations = tripsRepo.getTravelerPastDestinations(currentTraveler.id, allDestinationData);

  let loopCounter = 1;
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
    if ((destination.id === trip.destinationID) && (trip.status !== "pending")) {
    upcomingContainer.innerHTML += `<div class="upcoming-trip-${loopCounter}"><img class="upcoming-img-${loopCounter}" id="img" src=${destination.image} alt="${destination.alt}"><p class="destination">${destination.destination}<p><section class="trip-info"><p class="trip-start-date">Trip Start Date: ${trip.date}</p><p class="trip-duration">Trip Duration: ${trip.duration} days</p><p class="number-of-travelers">Number of Travelers: ${trip.travelers}</p></section></div>`
    loopCounter++;
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

  let loopCounter = 1;
  if (pendingDestinations.length > 0) {
  pendingDestinations.forEach(destination => {
    pendingTrips.forEach(trip => {
    if (destination.id === trip.destinationID) {
    pendingContainer.innerHTML += `<div class="pending-trip-${loopCounter}"><img class="pending-img-${loopCounter}" id="img" src=${destination.image} alt="${destination.alt}"><p class="destination">${destination.destination}<p><section class="trip-info"><p class="trip-start-date">Trip Start Date: ${trip.date}</p><p class="trip-duration">Trip Duration: ${trip.duration} days</p><p class="number-of-travelers">Number of Travelers: ${trip.travelers}</p></section></div>`
    loopCounter++;
    }
    })
  })
    } else {
      pendingMessage.innerText = "You have no pending trips to display. Head back to the main page to book a new trip!"
    }
}

  function bookTrip(event) {
    event.preventDefault();

    let tripIdValue = allTripData.length + 1;
    let date = dateSelect.value.split("-").join("/");
    let estimatedCost = '';
    console.log("TripIdValue", tripIdValue)
    let destinationIdValue = 0;
    console.log(allDestinationData)
    console.log("DESTINATION", destinationSelect.value)

    allDestinationData.forEach(destination => {
      if (destination["destination"] === destinationSelect.value) {
        destinationIdValue += destination.id;
        let travelAgentFee = estimatedCost * .1
        let travelCosts = ((travelersSelect.value * destination.estimatedFlightCostPerPerson) + (daysSelect.value * destination.estimatedLodgingCostPerDay));

        estimatedCost = (travelCosts + travelAgentFee).toFixed(2);

        console.log("theDestination=>", destination)
        console.log("COST", estimatedCost);
      }
    })

    estimatedCostSection.innerText = `Trips estimated cost is $${estimatedCost}`

    // allTripData.forEach(trip => {
    //   if (destinationIdValue === trip["destinationID"]) {
    //     tripIdValue += trip.id;
    //     console.log("theTrip=>", trip)
    //   }
    // })

    // bookedTrip.push({ "id": tripIdValue, "userID": currentTraveler.id, "destinationID": destinationIdValue, "travelers": travelersSelect.value, "date": date, "duration": daysSelect.value, "status": "pending"})
    // console.log("BOOKED TRIP>>>>>", bookedTrip)

    // tripForm.reset();
    submitTripButton.disabled = false;
  }

  function postTrip(event) {
    event.preventDefault();

    let tripIdValue = allTripData.length + 1;
    let date = dateSelect.value.split("-").join("/");
    let estimatedCost = '';
    console.log("TripIdValue", tripIdValue)
    let destinationIdValue = 0;
    console.log(allDestinationData)
    console.log("DESTINATION", destinationSelect.value)

    allDestinationData.forEach(destination => {
      if (destination["destination"] === destinationSelect.value) {
        destinationIdValue += destination.id;
      }
    })

    bookedTrip.push({ "id": tripIdValue, "userID": currentTraveler.id, "destinationID": destinationIdValue, "travelers": travelersSelect.value, "date": date, "duration": daysSelect.value, "status": "pending", "suggestedActivities": []})
    console.log("BOOKED TRIP>>>>>", bookedTrip)
    console.log("DATA TO POST>>>>", bookedTrip[0]);
    postTripData(bookedTrip[0]);
    window.location.reload();

    // tripForm.reset();
    // submitTripButton.disabled = true;
  }

// function checkForErrors(response) {
//   console.log(response);
//   if (response.status === 404) {
//     throw new Error(`${response.status} - something went wrong. ${response.statusText}`);
//   }
//   return response.json()
// }




  // function buttonEnable() {
  //   if ((dateSelect.value.length === 0) || (daysSelect.value.length  === 0) || (travelersSelect.value.length === 0) || (destinationSelect.value.length === 0)) {
  //     submitButton.disabled = true;
  //   } else {
  //     submitButton.disabled = false;
  //   }
  //   // submitButton.disabled = true;
  // }

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
