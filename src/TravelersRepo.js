class TravelersRepo {
  constructor(allTravelersData) {
    this.data = allTravelersData
  }


getDataByTravelerId(travelerId) {
  const theTraveler = this.data.find(traveler => travelerId === traveler["id"])
  // console.log(">>>>theTraveler", theTraveler)
  return theTraveler;
}

}






export default TravelersRepo;
