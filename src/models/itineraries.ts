import { prisma } from '../server';


//GET

//Returns all stored itineraries
export async function fetchAllItineraries () {

    const allLocations = await prisma.itineraries.findMany({
        select: {

        }
    });

    return allLocations;
}

//Return itinerary by Itinerary Name
export async function fetchLocationByItineraryName () {

    const itineraryByName = await prisma.itinerary_locations.findFirst({
        select: {

        }
    });

    return itineraryByName;
}


//Return itinerary by Itinerary ID
export async function fetchItineraryByID () {

    const itineraryByItineraryID = await prisma.itinerary_locations.findFirst({
        select: {

        }
    });

    return itineraryByItineraryID;
}