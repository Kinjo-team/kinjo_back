import { prisma } from '../server';


//GET

//Returns all stored locations
export async function fetchAllLocations () {

    const allLocations = await prisma.itinerary_locations.findMany({
        select: {

        }
    });

    return allLocations;
}

//Return itinerary locations by Itinerary Name
export async function fetchLocationByItineraryName () {

    const itineraryLocationsByName = await prisma.itinerary_locations.findFirst({
        select: {

        }
    });

    return itineraryLocationsByName;
}


//Return itinerary locations by Itinerary ID
export async function fetchLocationsByItineraryId () {

    const itineraryLocationsByItineraryID = await prisma.itinerary_locations.findFirst({
        select: {

        }
    });

    return itineraryLocationsByItineraryID;
}


//Return itinerary locations by Tags
export async function fetchLocationsByTags () {

    const itineraryLocationsByTags = await prisma.itinerary_locations.findMany({
        select: {

        }
    });

    return itineraryLocationsByTags;
}

//Return itinerary locations with duration greater than
export async function fetchLocationsWithDurationGreaterThan (dur: Number) {

    const itineraryLocationsByTags = await prisma.itinerary_locations.findMany({
        select: {

        }
    });

    return itineraryLocationsByTags;
}

//Return itinerary locations with duration less than
export async function fetchLocationsWithDurationLessThan (dur: Number) {

    const itineraryLocationsByTags = await prisma.itinerary_locations.findMany({
        select: {

        }
    });

    return itineraryLocationsByTags;
}



//POST
//PATCH
//DELETE
