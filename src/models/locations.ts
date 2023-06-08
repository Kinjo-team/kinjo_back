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




//Return itinerary locations by Tags
export async function fetchLocationsByTags () {

    const itineraryLocationsByTags = await prisma.itinerary_locations.findMany({
        select: {

        }
    });

    return itineraryLocationsByTags;
}

//Return itinerary locations with duration greater than
export async function fetchLocationsWithDurationGreaterThan (dur: number) {

    const itineraryLocationsByDuration = await prisma.itinerary_locations.findMany({
        select: {

        }
    });

    return itineraryLocationsByDuration;
}

//Return itinerary locations with duration less than
export async function fetchLocationsWithDurationLessThan (dur: number) {

    const itineraryLocationsByDuration = await prisma.itinerary_locations.findMany({
        select: {

        }
    });

    return itineraryLocationsByDuration;
}



//POST
//PATCH
//DELETE
