import { itineraries } from '@prisma/client';
import { prisma } from '../server';

//GET
//Returns all stored itineraries
export async function fetchAllItineraries () {

    return await prisma.itineraries.findMany();
}

//Return itinerary by Itinerary Name
export async function fetchItineraryByName (name: string) {

    const itineraryByName = await prisma.itineraries.findFirst({
        where: {
            itinerary_name: name
        }
    });

    return itineraryByName;
}

//Return itinerary by Itinerary ID
export async function fetchItineraryByID (id: number) {

    const itineraryByItineraryID = await prisma.itineraries.findFirst({
        where: {
            itinerary_id: id
        }

    });

    return itineraryByItineraryID;
}

//Return itinerary by Creator ID
export async function fetchItineraryByCreatorID (id: number) {

    const itineraryByCreatorID = await prisma.itineraries.findFirst({
        where: {
            creator_id: id
        }
    });

    return itineraryByCreatorID;
}

//Return itineraries by tag 
export async function fetchItinerariesWithTags (tags: string[]) {

    if (tags.length > 0 ){

        const itinerariesWithTag = await prisma.itineraries.findMany({
            where: {
                itinerary_tags: {
                    hasSome: tags}
            }
        });

        return itinerariesWithTag;
    }
};


//Return itineraries with duration greater than
export async function fetchItinerariesWithDurationGreaterThan (duration: number) {

    const itinerariesWhereDuration = await prisma.itineraries.findMany({
        where: {
            itinerary_duration: {
                gte: duration
            }
        }
    });

    return itinerariesWhereDuration;
}

//Return itineraries with duration less than
export async function fetchItinerariesWithDurationLessThan (duration: number) {

    const itinerariesWhereDuration = await prisma.itineraries.findMany({
        where: {
            itinerary_duration: {
                lte: duration
            }
        }
    });

    return itinerariesWhereDuration;
}

//Return itinerary locations by Itinerary Name
export async function fetchLocationsByItineraryName (itineraryName: string) {

    const itineraryLocationsByName = await prisma.itineraries.findFirst({
        where: {
            itinerary_name: itineraryName
        }
    });

    return itineraryLocationsByName?.location_ids;
}

//Return itinerary locations by Itinerary ID
export async function fetchLocationsByItineraryId (itineraryID: number) {

    const itineraryLocationsByItineraryID = await prisma.itineraries.findFirst({
        where: {
            itinerary_id: itineraryID
        }
    });

    return itineraryLocationsByItineraryID?.location_ids;
}


//POST
//Add new itinerary
// export async function createItinerary(itinerary: Itineraries) {

//     const { creator_id, itinerary_name, itinerary_tags, location_ids, itinerary_duration } = itinerary;

//     const newItinerary = await prisma.itineraries.create ({
//         data: {
//             creator_id: creator_id,
//             itinerary_name: itinerary_name,
//             itinerary_tags: itinerary_tags,
//             location_ids: location_ids,
//             itinerary_duration: itinerary_duration

//         }
//     })

//   return newItinerary.itinerary_name;
//   }

export const createItinerary = async (itinerary: itineraries) => {
    const newItinerary = await prisma.itineraries.create({
      data: {
        creator_id: itinerary.creator_id,
        itinerary_name: itinerary.itinerary_name,
        itinerary_tags: itinerary.itinerary_tags,
        location_ids: itinerary.location_ids,
        itinerary_duration: itinerary.itinerary_duration,
      },
    });
  
    return newItinerary;
  };


//PATCH
//Modify existing itinerary
export async function modifyItinerary(itinerary: itineraries) {

    const { itinerary_id } = itinerary;

    const modifiedItinerary = await prisma.itineraries.update({
        where: {
          itinerary_id: itinerary_id
        },
        data: {
            creator_id: itinerary.creator_id,
            itinerary_name: itinerary.itinerary_name,
            itinerary_tags: itinerary.itinerary_tags,
            location_ids: itinerary.location_ids,
            itinerary_duration: itinerary.itinerary_duration,
          },
    })

    return modifiedItinerary;
}

//DELETE
//Delete itinerary by name
export async function deleteItineraryByName(itineraryName: string) {
    // const { itinerary_name } = itinerary;
    const deleteItinerary = await prisma.itineraries.delete({
        where: {
            itinerary_name: itineraryName,
        }
    });

    return deleteItinerary.itinerary_name;
}

//Delete itinerary by ID
export async function deleteItineraryByItineraryID(itineraryID: number) {
    // const { itinerary_id } = itinerary;
    const deleteItinerary = await prisma.itineraries.delete({
        where: {
            itinerary_id: itineraryID,
        }
    });

    return deleteItinerary.itinerary_id;
}

//Delete itinerary by Creator ID
export async function deleteItineraryByCreatorID(creatorID: number) {
    // const { creator_id } = itinerary;
    const deleteItinerary = await prisma.itineraries.deleteMany({
        where: {
            creator_id: creatorID,
        }
    });

    return deleteItinerary.count;
}