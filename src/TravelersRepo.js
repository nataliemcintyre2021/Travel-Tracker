class TravelersRepo {
  constructor(allTravelersData) {
    this.data = allTravelersData
  }


getDataByTravelerId(travelerId) {
  const theTraveler = this.data.find(traveler => travelerId === traveler["id"])
  return theTraveler;
}

showTravelerFirstName(travelerId) {
  const theTraveler = this.data.find(traveler => travelerId === traveler["id"])
  const theName = theTraveler.name.split(" ");
  return theName[0];
}

}



export default TravelersRepo;
