//CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/TravelTracker.png';

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

//event listeners

window.addEventListener('load', fetchData)

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
  currentTraveler = travelersRepo.getDataByTravelerId(44);
  console.log("CURRENT TRAVELER>>>", currentTraveler);
  tripsRepo = new Trips(allTripData);
  getExpenses();
}

function getExpenses() {
  let userExpenses = tripsRepo.getLastYearsTravelersTripExpenses(currentTraveler.id, allDestinationData)
  yearExpenses.innerText = `Amount spent on trips this year: $${userExpenses.toFixed(2)}`

  getTrips();
}

function getTrips() {
  let pastTrips = tripsRepo.getTravelerPastTrips(currentTraveler.id);
  let upcomingTrips = tripsRepo.getTravelerUpcomingTrips(currentTraveler.id);
  let presentTrips = tripsRepo.getTravelerPresentTrips(currentTraveler.id);
  let pastDestinations = tripsRepo.getTravelerPastDestinations(currentTraveler.id, allDestinationData);
  let upcomingDestinations = tripsRepo.getTravelerUpcomingDestinations(currentTraveler.id, allDestinationData);
  let presentDestinations = tripsRepo.getTravelerPresentDestinations(currentTraveler.id, allDestinationData);

  let loopCounter1 = 1;
  upcomingDestinations.forEach(destination => {
    upcomingTrips.forEach(trip => {
      if (destination.id === trip.destinationID) {
      upcomingContainer.innerHTML += `<div class="upcoming-trip-${loopCounter1}"><img class="upcoming-img-${loopCounter1}" id="img" src=${destination.image} alt="${destination.alt}"><p class="destination">${destination.destination}<p><section class="trip-info"><p class="trip-start-date">Trip Start Date: ${trip.date}</p><p class="trip-duration">Trip Duration: ${trip.duration} days</p><p class="number-of-travelers">Number of Travelers: ${trip.travelers}</p></section></div>`
      loopCounter1++;
    }
    })
  })

    let loopCounter2 = 1;
     pastDestinations.forEach(destination => {
       pastTrips.forEach(trip => {
         if (destination.id === trip.destinationID) {
           pastContainer.innerHTML +=
           `<div class="past-trip-${loopCounter2}">
               <img class="upcoming-img-${loopCounter2}" id="img" src=${destination.image} alt="${destination.alt}">
               <p class="destination">${destination.destination}</p>
               <section class="trip-info">
                  <p class="trip-start-date">Trip Start Date: ${trip.date}</p>
                  <p class="trip-duration">Trip Duration: ${trip.duration} days</p>
                  <p class="number-of-travelers">Number of Travelers: ${trip.travelers}</p>
                </section>

            </div>`
           loopCounter2++;
         }
       })
     })

     let loopCounter3 = 1;
      presentDestinations.forEach(destination => {
        presentTrips.forEach(trip => {
          if (destination.id === trip.destinationID) {
            presentContainer.innerHTML +=
            `<div class="past-trip-${loopCounter3}">
                <img class="upcoming-img-${loopCounter3}" id="img" src=${destination.image} alt="${destination.alt}">
                <p class="destination">${destination.destination}</p>
                <section class="trip-info">
                   <p class="trip-start-date">Trip Start Date: ${trip.date}</p>
                   <p class="trip-duration">Trip Duration: ${trip.duration} days</p>
                   <p class="number-of-travelers">Number of Travelers: ${trip.travelers}</p>
                 </section>

             </div>`
            loopCounter3++;
          }
        })
      })




   }
