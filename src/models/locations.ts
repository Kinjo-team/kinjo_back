import { Itinerary_locations } from "@prisma/client";
import { prisma } from "../server";

//GET
//Returns all stored locations
export async function fetchAllLocations() {
  return await prisma.itinerary_locations.findMany();
}

//Get location by Location ID
export async function fetchLocationByLocationID(id: number) {
  const locationByID = await prisma.itinerary_locations.findMany({
    where: {
      loc_id: id,
    },
  });

  return locationByID;
}

// //Get locations by Creator ID
// export async function fetchLocationsByCreatorID (id: number) {

//     const locationsByCreatorID = await prisma.itinerary_locations.findMany({
//         where: {
//             creator_id: id
//             }
//     });

//     return locationsByCreatorID;
// }

// //Get location by name
export async function fetchLocationsByLocationName(name: string) {
  const locationByName = await prisma.itinerary_locations.findMany({
    where: {
      loc_name: name,
    },
  });

  return locationByName;
}

//Return itinerary locations by Tags
// export async function fetchLocationsByTags (tags: string[]) {

//     const itineraryLocationsByTags = await prisma.itinerary_locations.findMany({
//         where: {
//             loc_tags: {
//                 hasSome: tags}
//         }
//     });

//     return itineraryLocationsByTags;
// }

// //Return itinerary locations with duration greater than
// export async function fetchLocationsWithDurationGreaterThan (duration: number) {

//     const itineraryLocationsByDuration = await prisma.itinerary_locations.findMany({
//         where: {
//             loc_duration: {
//                 lte: duration
//             }
//         }
//     });

//     return itineraryLocationsByDuration;
// }

// //Return itinerary locations with duration less than
// export async function fetchLocationsWithDurationLessThan (duration: number) {

//     const itineraryLocationsByDuration = await prisma.itinerary_locations.findMany({
//         where: {
//             loc_duration: {
//                 gte: duration
//             }
//         }
//     });

//     return itineraryLocationsByDuration;
// }

//POST

// Prisma.create function for Itinerary_locations table
// export const createItineraryLocation = async (location: locations) => {
//   const itineraryLocation = await prisma.itinerary_locations.create({
//     data: {
// creator_id: location.creator_id,
// loc_name: location.loc_name,
// loc_lat: location.loc_lat,
// loc_long: location.loc_long,
// loc_coords: location.loc_coords,
// loc_address: location.loc_address,
// loc_duration: location.loc_duration,
// loc_descr_en: location.loc_descr_en,
// loc_descr_jp: location.loc_descr_jp,
// loc_imgUrls: location.loc_imgUrls,
// loc_tags: location.loc_tags,
//     },
//   });

//   return itineraryLocation;
// };

//   //PATCH
// export const updateItineraryLocation = async (location: locations) => {
//   const itineraryLocation = await prisma.itinerary_locations.update({
//     where: {
//       loc_id: location.loc_id,
//     },
//     data: {
// creator_id: location.creator_id,
// loc_name: location.loc_name,
// loc_lat: location.loc_lat,
// loc_long: location.loc_long,
// loc_coords: location.loc_coords,
// loc_address: location.loc_address,
// loc_duration: location.loc_duration,
// loc_descr_en: location.loc_descr_en,
// loc_descr_jp: location.loc_descr_jp,
// loc_imgUrls: location.loc_imgUrls,
// loc_tags: location.loc_tags,
//     },
//   });

//   return itineraryLocation;
// };

//DELETE

//Delete itinerary by ID
// export async function deleteLocationsByItineraryID(locationID: number) {
// const { loc_id } = location;
//   const deleteItinerary = await prisma.itinerary_locations.delete({
//     where: {
//       loc_id: locationID,
//     },
//   });

//   return deleteItinerary;
// }

// //Delete *all* locations by Creator ID
// export async function deleteLocationsByCreatorID(creatorID: number) {
//     // const { creator_id } = location;
//     const deleteItinerary = await prisma.itinerary_locations.deleteMany({
//         where: {
//             creator_id: creatorID,
//         }
//     });

//     return deleteItinerary.count;
// }
