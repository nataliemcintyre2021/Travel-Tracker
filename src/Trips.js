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
    return pastTravelerTrips;
  }

  getTravelerUpcomingTrips(userId) {
    const now = Date.now();
    const upcomingTravelerTrips = this.data.filter(trip => (userId === trip["userID"]) && (((Date.parse(trip["date"]) + (trip["duration"] * 86400000)) > now) && (Date.parse(trip["date"]) > now)))
    return upcomingTravelerTrips;
  }

  getTravelerPresentTrips(userId) {
    const now = Date.now();
    const presentTravelerTrips = this.data.filter(trip => (userId === trip["userID"]) && (now >= (Date.parse(trip["date"])) && now <= (Date.parse(trip["date"]) + (trip["duration"] * 86400000)))
  )
    return presentTravelerTrips;
  }

  getLastYearsTravelersTrips(userId) {
    const nowMilliseconds = Date.now();
    const oneYearAgoTodayMilliseconds = nowMilliseconds - 31556952000;
    const pastYearTrips = this.data.filter(trip => (userId === trip["userID"]) && (Date.parse(trip["date"]) >= oneYearAgoTodayMilliseconds) && (Date.parse(trip["date"]) < nowMilliseconds))
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
    return pastDestinations;
  }


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
    let thePresentTrips = this.getTravelerPresentTrips(userId);

    const presentDestinations = destinationData.reduce((arr, destination) => {
      thePresentTrips.forEach(trip => {
        if (destination["id"] === trip["destinationID"]) {
          arr.push(destination)
        }
      })
      return arr;
    }, [])

    return presentDestinations;
  }

  getTravelerPendingTrips(userId) {
    const trips = this.getTravelerTripsById(userId);
    let pendingTrips = [];
    trips.forEach(trip => {
      if ((trip.status === "pending") && (!pendingTrips.includes(trip))) {
        pendingTrips.push(trip)
      }
    })
    return pendingTrips;
  }

  getTravelerPendingDestinations(userId, destinationData) {
    let theTrips = this.getTravelerPendingTrips(userId);

    const pendingDestinations = destinationData.reduce((arr, destination) => {
      theTrips.forEach(trip => {
        if ((destination["id"] === trip["destinationID"]) && (!arr.includes(destination))) {
          arr.push(destination)
        }
      })
      return arr;
    }, [])
    return pendingDestinations;
  }
}



export default Trips;
