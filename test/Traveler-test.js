import { expect } from 'chai';
import Traveler from '../src/Traveler';

describe('Traveler', () => {

  it('should be a function', function () {
    expect(Traveler).to.be.a('function');
  });

  it('should have a parameter to take in a travelerData object', function () {
    const traveler3 = new Traveler (
      {
        "id": 3,
        "name": "Sibby Dawidowitsch",
        "travelerType": "shopper"
      });
      console.log(">>>>Traveler3", traveler3)
    expect(traveler3).to.be.an.instanceof(Traveler);
  })
})
