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
      {
        "id": 3,
        "userID": 3,
        "destinationID": 22,
        "travelers": 4,
        "date": "2021/08/06",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
      },
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

  it('should return present trips', function () {

    const traveler3PresentTrips = [
      {
        "id": 3,
        "userID": 3,
        "destinationID": 22,
        "travelers": 4,
        "date": "2021/08/06",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
      }
    ];

    const presentTrips = tripsRepo.getTravelerPresentTrips(3);

    expect(presentTrips).to.deep.equal(traveler3PresentTrips);

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

  it('should calcuate amount traveler spent on trips this year including agent fee', function () {
    const destinationData = [
      {
        "id":1,
        "destination":"Lima, Peru",
        "estimatedLodgingCostPerDay":70,
        "estimatedFlightCostPerPerson":400,
        "image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        "alt":"overview of city buildings with a clear sky"
      },
      {
        "id":16,
        "destination":"Bangkok, Thailand",
        "estimatedLodgingCostPerDay":35,
        "estimatedFlightCostPerPerson":988,
        "image":"https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
        "alt":"ornate buildings with a garden during the day"
      },
      {
        "id":22,
        "destination":"Rome, Italy",
        "estimatedLodgingCostPerDay":90,
        "estimatedFlightCostPerPerson":650,
        "image":"https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt":"people standing inside a colosseum during the day"
      },
      {
        "id":25,
        "destination":"New York, New York",
        "estimatedLodgingCostPerDay":175,
        "estimatedFlightCostPerPerson":200,
        "image":"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt":"people crossing the street during the day surrounded by tall buildings and advertisements"
      },
      {
        "id":42,
        "destination":"Santo Domingo, Dominican Republic",
        "estimatedLodgingCostPerDay":400,
        "estimatedFlightCostPerPerson":80,
        "image":"https://images.unsplash.com/photo-1510541383520-4daa77a666cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1782&q=80",
        "alt":"aerial view of houses and high rise building"
      }
    ];

    const yearsCost = tripsRepo.getLastYearsTravelersTripExpenses(50, destinationData);

    expect(yearsCost).to.equal(2552);
  })

  it('should get traveler past destinations', function () {
    const destinationData = [
      {
        "id":1,
        "destination":"Lima, Peru",
        "estimatedLodgingCostPerDay":70,
        "estimatedFlightCostPerPerson":400,
        "image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        "alt":"overview of city buildings with a clear sky"
      },
      {
        "id":16,
        "destination":"Bangkok, Thailand",
        "estimatedLodgingCostPerDay":35,
        "estimatedFlightCostPerPerson":988,
        "image":"https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
        "alt":"ornate buildings with a garden during the day"
      },
      {
        "id":22,
        "destination":"Rome, Italy",
        "estimatedLodgingCostPerDay":90,
        "estimatedFlightCostPerPerson":650,
        "image":"https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt":"people standing inside a colosseum during the day"
      },
      {
        "id":25,
        "destination":"New York, New York",
        "estimatedLodgingCostPerDay":175,
        "estimatedFlightCostPerPerson":200,
        "image":"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt":"people crossing the street during the day surrounded by tall buildings and advertisements"
      },
      {
        "id":42,
        "destination":"Santo Domingo, Dominican Republic",
        "estimatedLodgingCostPerDay":400,
        "estimatedFlightCostPerPerson":80,
        "image":"https://images.unsplash.com/photo-1510541383520-4daa77a666cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1782&q=80",
        "alt":"aerial view of houses and high rise building"
      }
    ];

    const traveler3PastDestinationData = [
      {
        "id":16,
        "destination":"Bangkok, Thailand",
        "estimatedLodgingCostPerDay":35,
        "estimatedFlightCostPerPerson":988,
        "image":"https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
        "alt":"ornate buildings with a garden during the day"
      },
      {
        "id":25,
        "destination":"New York, New York",
        "estimatedLodgingCostPerDay":175,
        "estimatedFlightCostPerPerson":200,
        "image":"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt":"people crossing the street during the day surrounded by tall buildings and advertisements"
      }
    ];

    const travelerPastDestinations = tripsRepo.getTravelerPastDestinations(3, destinationData);

    expect(travelerPastDestinations).to.deep.equal(traveler3PastDestinationData)
  });

  it('should get traveler upcoming destinations', function () {
    const destinationData = [
      {
        "id":1,
        "destination":"Lima, Peru",
        "estimatedLodgingCostPerDay":70,
        "estimatedFlightCostPerPerson":400,
        "image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        "alt":"overview of city buildings with a clear sky"
      },
      {
        "id":16,
        "destination":"Bangkok, Thailand",
        "estimatedLodgingCostPerDay":35,
        "estimatedFlightCostPerPerson":988,
        "image":"https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
        "alt":"ornate buildings with a garden during the day"
      },
      {
        "id":22,
        "destination":"Rome, Italy",
        "estimatedLodgingCostPerDay":90,
        "estimatedFlightCostPerPerson":650,
        "image":"https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt":"people standing inside a colosseum during the day"
      },
      {
        "id":25,
        "destination":"New York, New York",
        "estimatedLodgingCostPerDay":175,
        "estimatedFlightCostPerPerson":200,
        "image":"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt":"people crossing the street during the day surrounded by tall buildings and advertisements"
      },
      {
        "id":42,
        "destination":"Santo Domingo, Dominican Republic",
        "estimatedLodgingCostPerDay":400,
        "estimatedFlightCostPerPerson":80,
        "image":"https://images.unsplash.com/photo-1510541383520-4daa77a666cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1782&q=80",
        "alt":"aerial view of houses and high rise building"
      }
    ];

    const traveler3UpcomingDestinationData = [
      {
        "id":22,
        "destination":"Rome, Italy",
        "estimatedLodgingCostPerDay":90,
        "estimatedFlightCostPerPerson":650,
        "image":"https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt":"people standing inside a colosseum during the day"
      }
    ];

    const travelerUpcomingDestinations = tripsRepo.getTravelerUpcomingDestinations(3, destinationData);

    expect(travelerUpcomingDestinations).to.deep.equal(traveler3UpcomingDestinationData)
  })

  it('should get traveler present destinations', function () {
    const destinationData = [
      {
        "id":1,
        "destination":"Lima, Peru",
        "estimatedLodgingCostPerDay":70,
        "estimatedFlightCostPerPerson":400,
        "image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        "alt":"overview of city buildings with a clear sky"
      },
      {
        "id":16,
        "destination":"Bangkok, Thailand",
        "estimatedLodgingCostPerDay":35,
        "estimatedFlightCostPerPerson":988,
        "image":"https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
        "alt":"ornate buildings with a garden during the day"
      },
      {
        "id":22,
        "destination":"Rome, Italy",
        "estimatedLodgingCostPerDay":90,
        "estimatedFlightCostPerPerson":650,
        "image":"https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt":"people standing inside a colosseum during the day"
      },
      {
        "id":25,
        "destination":"New York, New York",
        "estimatedLodgingCostPerDay":175,
        "estimatedFlightCostPerPerson":200,
        "image":"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt":"people crossing the street during the day surrounded by tall buildings and advertisements"
      },
      {
        "id":42,
        "destination":"Santo Domingo, Dominican Republic",
        "estimatedLodgingCostPerDay":400,
        "estimatedFlightCostPerPerson":80,
        "image":"https://images.unsplash.com/photo-1510541383520-4daa77a666cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1782&q=80",
        "alt":"aerial view of houses and high rise building"
      }
    ];

    const traveler3PresentDestinationData = [
      {
        "id":22,
        "destination":"Rome, Italy",
        "estimatedLodgingCostPerDay":90,
        "estimatedFlightCostPerPerson":650,
        "image":"https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt":"people standing inside a colosseum during the day"
      }
    ];

    const travelerPresentDestinations = tripsRepo.getTravelerPresentDestinations(3, destinationData);

    expect(travelerPresentDestinations).to.deep.equal(traveler3PresentDestinationData)
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
