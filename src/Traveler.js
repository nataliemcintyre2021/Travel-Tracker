class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
  }

  showTravelerFirstName() {
    const name = this.name.split(" ");
    return name[0];
  }
}
















export default Traveler;
