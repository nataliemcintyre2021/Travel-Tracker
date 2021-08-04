import { expect } from 'chai';
import Trips from '../src/Trips';

describe('Trips', () => {
  let theTripsData;
  let tripsRepo;
  beforeEach(function() {
    theTripsData = [
      {
        "id": 3,
        "userID": 3,
        "destinationID": 22,
        "travelers": 4,
        "date": "2022/05/22",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
      },
      // {
      //   "id": 3,
      //   "userID": 3,
      //   "destinationID": 22,
      //   "travelers": 4,
      //   "date": "2021/08/04",
      //   "duration": 17,
      //   "status": "approved",
      //   "suggestedActivities": []
      // },
      {
        "id": 41,
        "userID": 3,
        "destinationID": 25,
        "travelers": 3,
        "date": "2020/08/30",
        "duration": 11,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 50,
        "userID": 3,
        "destinationID": 16,
        "travelers": 5,
        "date": "2020/07/02",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 11,
        "userID": 50,
        "destinationID": 5,
        "travelers": 4,
        "date": "2022/10/14",
        "duration": 4,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 15,
        "userID": 50,
        "destinationID": 13,
        "travelers": 3,
        "date": "2022/07/04",
        "duration": 6,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 43,
        "userID": 50,
        "destinationID": 42,
        "travelers": 4,
        "date": "2021/01/09",
        "duration": 5,
        "status": "approved",
        "suggestedActivities": []
      }];

    tripsRepo = new Trips(theTripsData);
  });

  it('should be a function', function() {
    expect(Trips).to.be.a('function');
  });

  it('should have a parameter to take in trip data', function () {
    expect(tripsRepo).to.be.an.instanceof(Trips);
  });

  it('should return traveler trips based on userID', function () {

    const traveler50Trips = [
      {
          "id": 11,
          "userID": 50,
          "destinationID": 5,
          "travelers": 4,
          "date": "2022/10/14",
          "duration": 4,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 15,
          "userID": 50,
          "destinationID": 13,
          "travelers": 3,
          "date": "2022/07/04",
          "duration": 6,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 43,
          "userID": 50,
          "destinationID": 42,
          "travelers": 4,
          "date": "2021/01/09",
          "duration": 5,
          "status": "approved",
          "suggestedActivities": []
        }];

    const specificTravelerTrips = tripsRepo.getTravelerTripsById(50);
    // console.log(">>>TRAVELER50", specificTravelerTrips)
    expect(specificTravelerTrips).to.deep.equal(traveler50Trips);
  })

  it('should return traveler trips in the past', function () {

    const traveler3PastTrips = [
        {
          "id": 41,
          "userID": 3,
          "destinationID": 25,
          "travelers": 3,
          "date": "2020/08/30",
          "duration": 11,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 50,
          "userID": 3,
          "destinationID": 16,
          "travelers": 5,
          "date": "2020/07/02",
          "duration": 17,
          "status": "approved",
          "suggestedActivities": []
        }];

    const pastTrips = tripsRepo.getTravelerPastTrips(3);

    expect(pastTrips).to.deep.equal(traveler3PastTrips);
  })

  it('should return traveler trips that are upcoming', function () {

    const traveler3UpcomingTrips = [
      {
        "id": 3,
        "userID": 3,
        "destinationID": 22,
        "travelers": 4,
        "date": "2022/05/22",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
      }];

    const upcomingTrips = tripsRepo.getTravelerUpcomingTrips(3);

    expect(upcomingTrips).to.deep.equal(traveler3UpcomingTrips);
  })

  it('should return travel trips in the past year', function () {
    const traveler50LastYearTrips = [
    {
      "id": 43,
      "userID": 50,
      "destinationID": 42,
      "travelers": 4,
      "date": "2021/01/09",
      "duration": 5,
      "status": "approved",
      "suggestedActivities": []
    }];

    const lastYearTrips = tripsRepo.getLastYearsTravelersTrips(50);

    expect(lastYearTrips).to.deep.equal(traveler50LastYearTrips);
  })

  // it('should return traveler trips that are present', function () {
  //
  //   const traveler3PresentTrips = [
  //     {
  //       "id": 3,
  //       "userID": 3,
  //       "destinationID": 22,
  //       "travelers": 4,
  //       "date": "2021/08/04",
  //       "duration": 17,
  //       "status": "approved",
  //       "suggestedActivities": []
  //     }];
  //
  //   const presentTrips = tripsRepo.getTravelerPresentTrips(3);
  //
  //   expect(upcomingTrips).to.deep.equal(traveler3PresentTrips);
  // })
})
