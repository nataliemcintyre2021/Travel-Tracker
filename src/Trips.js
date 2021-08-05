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
    return pastYearTrips;

  }

  getLastYearsTravelersTripExpenses(userId, destinationData) {
    let lastYearTrips = this.getLastYearsTravelersTrips(userId);

    const tripCostsByDestinationOverLastYear = lastYearTrips.reduce((acc, trip) => {
      destinationData.forEach(destination => {
        if (destination["id"] === trip["destinationID"]) {
          acc += ((destination.estimatedLodgingCostPerDay * trip.duration) + (destination.estimatedFlightCostPerPerson * trip.travelers))
        }
      })
      return acc;
    }, 0)
    const travelAgentFee = tripCostsByDestinationOverLastYear * .1;
    const finalCost = tripCostsByDestinationOverLastYear + travelAgentFee;
    console.log("FINAL COST", finalCost)
    return finalCost;

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
