class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
  }

  getTraveler(travelerId) {
    const theTraveler = this.data.find(traveler => travelerId === traveler["id"])
    return theTraveler;
  }
}


export default Traveler;
