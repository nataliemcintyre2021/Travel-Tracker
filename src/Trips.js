class Trips {
  constructor(allUserTrips) {
    this.data = allUserTrips;
  }

  getTravelerTripsById(userId) {
    const travelerTrips = this.data.filter(trip => userId === trip["userID"]);
    return travelerTrips;
  }


  getLastYearsTravelersTrips(userId) {
    const nowMilliseconds = Date.now();
    const oneYearAgoTodayMilliseconds = nowMilliseconds - 31556952000;
    console.log("One year ago today millis", oneYearAgoTodayMilliseconds)
    const pastYearTrips = this.data.filter(trip => (userId === trip["userID"]) && (Date.parse(trip["date"]) >= oneYearAgoTodayMilliseconds) && (Date.parse(trip["date"]) < nowMilliseconds))
    console.log(pastYearTrips)
    return pastYearTrips
    //Goal: create function that returns total cost of a travelers trips in the last year.
    //Input: pastYearsTrips array of objects and destinations array of objects
    //Output: a number of total cost
    //Steps:
    //1. create function that takes in destination data
    //2. Iterate over last year trips using reduce

  }

  getLastYearsTravelersTripExpenses(userId, destinationData) {
    // const tripDestinationsOverLastYear = [];

    const lastYearTrips = this.data.getLastYearsTravelersTrips(userId);

    const tripCostsByDestinationOverLastYear = lastYearTrips.reduce((acc, trip) => {
      destinationData.forEach(destination => {
        if (destination["id"] === trip["destinationID"]) {
          acc += ((destination.estimatedLodgingCostPerDay * trip.duration) + (destination.estimatedFlightCostPerPerson * trip.travelers))
        }
      })
      return acc;
    }, 0) * .1;

    return tripCostsByDestinationOverLastYear;

    // const totalCost = tripDestinationsOverLastYear.reduce((acc, destination) => {
    //
    //   return acc;
    // }, 0)
  }

  getTravelerPastTrips(userId) {
    const now = Date.now();
    const pastTravelerTrips = this.data.filter(trip => (userId === trip["userID"]) && (Date.parse(trip["date"]) < now))
    console.log("PAST>>>", pastTravelerTrips)
    return pastTravelerTrips;
  }

  // getTravelerPresentTrips() {
  //   const now = Date.now();
  //   const presentTravelerTrips = this.data.filter(trip => (userId === trip["userID"]) && (Date.parse(trip["date"]) === now))
  //   console.log("Present>>>", presentTravelerTrips)
  //   return presentTravelerTrips;
  // }

  getTravelerUpcomingTrips(userId) {
    const now = Date.now();
    const upcomingTravelerTrips = this.data.filter(trip => (userId === trip["userID"]) && (Date.parse(trip["date"]) > now))
    console.log("Upcoming>>>", upcomingTravelerTrips)
    return upcomingTravelerTrips;
  }

  getUserPendingTrips() {

  }
}








export default Trips;
