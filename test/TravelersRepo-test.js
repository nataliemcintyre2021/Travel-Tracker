import { expect } from 'chai';
import TravelersRepo from '../src/TravelersRepo';

describe('Travelers Repo', () => {
  let travelersData;
  let repoData;
  beforeEach(function() {
    travelersData = [
      {
        "id": 1,
        "name": "Ham Leadbeater",
        "travelerType": "relaxer"
      },
      {
        "id": 2,
        "name": "Rachael Vaughten",
        "travelerType": "thrill-seeker"
      },
      {
        "id": 3,
        "name": "Sibby Dawidowitsch",
        "travelerType": "shopper"
      }];

      repoData = new TravelersRepo(travelersData);
  });

  it('should be a function', function () {
    expect(TravelersRepo).to.be.a('function');
  });

  it('should have a parameter to take in travelers data', function () {
    expect(repoData).to.be.an.instanceof(TravelersRepo);
  });

  it('should give user data based on traveler ID', function () {
    const specificTraveler = repoData.getDataByTravelerId(3);
    expect(specificTraveler).to.deep.equal(repoData.data[2]);
  })


})
