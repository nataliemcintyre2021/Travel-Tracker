class Trips {
  constructor(allUserTrips) {
    this.data = allUserTrips;
  }

  getTravelerTripsById(userId) {
    const travelerTrips = this.data.filter(trip => userId === trip["userID"]);
    return travelerTrips;
  }

  getTravelerPastTrips(userId) {
    const now = Date.now();
    const pastTravelerTrips = this.data.filter(trip => (userId === trip["userID"]) && (Date.parse(trip["date"]) + (trip["duration"] * 86400000)) < now)
    console.log("PAST TRIPS>>>", pastTravelerTrips)
    return pastTravelerTrips;
  }

  getTravelerUpcomingTrips(userId) {
    const now = Date.now();
    const upcomingTravelerTrips = this.data.filter(trip => (userId === trip["userID"]) && (((Date.parse(trip["date"]) + (trip["duration"] * 86400000)) > now) && (Date.parse(trip["date"]) > now)))
    console.log("UPCOMING TRIPS>>>", upcomingTravelerTrips)
    return upcomingTravelerTrips;
  }

  getTravelerPresentTrips(userId) {
    const now = Date.now();
    const presentTravelerTrips = this.data.filter(trip => (userId === trip["userID"]) && (now >= (Date.parse(trip["date"])) && now <= (Date.parse(trip["date"]) + (trip["duration"] * 86400000)))
  )
    console.log("PRESENT>>>", presentTravelerTrips)
    return presentTravelerTrips;
  }

  getLastYearsTravelersTrips(userId) {
    const nowMilliseconds = Date.now();
    const oneYearAgoTodayMilliseconds = nowMilliseconds - 31556952000;
    const pastYearTrips = this.data.filter(trip => (userId === trip["userID"]) && (Date.parse(trip["date"]) >= oneYearAgoTodayMilliseconds) && (Date.parse(trip["date"]) < nowMilliseconds))
    console.log("LAST YEAR TRIPS>>>", pastYearTrips)
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
    console.log("FINAL COST>>>>", finalCost)
    return finalCost;
  }

  getTravelerPastDestinations(userId, destinationData) {
    let thePastTrips = this.getTravelerPastTrips(userId);

    const pastDestinations = destinationData.reduce((arr, destination) => {
      thePastTrips.forEach(trip => {
        if (destination["id"] === trip["destinationID"]) {
          arr.push(destination)
        }
      })
      return arr;
    }, [])
    console.log("PAST DESTINATIONS>>>", pastDestinations)
    return pastDestinations;
  }

  //now is >= trip start date AND now is <= end date
  //end date will be trips parsed date plus one days milliseconds * duration

  getTravelerUpcomingDestinations(userId, destinationData) {
    let theUpcomingTrips = this.getTravelerUpcomingTrips(userId);

    const upcomingDestinations = destinationData.reduce((arr, destination) => {
      theUpcomingTrips.forEach(trip => {
        if (destination["id"] === trip["destinationID"]) {
          arr.push(destination)
        }
      })
      return arr;
    }, [])
    return upcomingDestinations;
  }

  getTravelerPresentDestinations(userId, destinationData) {
    let thePresentTrips = this.getTravelerUpcomingTrips(userId);

    const presentDestinations = destinationData.reduce((arr, destination) => {
      thePresentTrips.forEach(trip => {
        if (destination["id"] === trip["destinationID"]) {
          arr.push(destination)
        }
      })
      return arr;
    }, [])
    console.log("PRESENT DESTINATIONS>>>", presentDestinations)
    return presentDestinations;
  }

  // getUserPendingTrips() {
  //
  // }
}



export default Trips;
