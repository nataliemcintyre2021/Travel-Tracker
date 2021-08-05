// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
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
let allTravelerData = [];
let allTripData = [];
let allDestinationData = [];

console.log('This is the JavaScript entry file - your code begins here.');

const yearExpenses = document.getElementById('yearly-expenses');
//updating code

window.addEventListener('load', fetchData)

function fetchData() {
  Promise.all([getAllTravelersData(), getAllTripsData(), getAllDestinationsData()])
  .then(values => parseValues(values))

}

function parseValues(data) {
  data[0].travelers.forEach(traveler => allTravelerData.push(traveler));
  data[1].trips.forEach(trip => allTripData.push(trip));
  data[2].destinations.forEach(destination => allDestinationData.push(destination));
  console.log(allTravelerData)
  console.log(allTripData)
  console.log(allDestinationData)
  createNewTraveler();
}

function createNewTraveler() {
  // let travelersRepo = new TravelersRepo(allTravelerData);
  // currentTraveler = new Traveler()
  let travelers = new TravelersRepo(allTravelerData);
  currentTraveler = travelers.getDataByTravelerId(3)
  console.log("CURRENTTRAVELER>>>", currentTraveler)
  let tripsRepo = new Trips(allTripData);
  let userExpenses = tripsRepo.getLastYearsTravelersTripExpenses(3, allDestinationData)
  yearExpenses.innerText = `Amount spent on trips this year: $${userExpenses.toFixed(2)}`


}

// function showExpensesThisYear() {
//
// }
