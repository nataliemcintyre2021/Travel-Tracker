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
    const pastTravelerTrips = this.data.filter(trip => (userId === trip["userID"]) && (Date.parse(trip["date"]) < now))
    console.log("PAST>>>", pastTravelerTrips)
    return pastTravelerTrips;
  }

  getUserPresentTrips() {

  }

  getUserUpcomingTrips() {

  }

  getUserPendingTrips() {

  }
}








export default Trips;
