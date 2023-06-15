import { prisma } from "../server";
import { ItineraryData } from "../../globals";
import { Itineraries, Itinerary_locations } from "@prisma/client";
import { LocationData } from "../../globals";

//GET
// Return itineraries by search option
export async function fetchItinerariesBySearchOption(option: string, value: string) {
    let itineraries: any[] = [];
    value = value.toLowerCase();

    if (option === "Name") {
        itineraries = await prisma.itineraries.findMany({
            where: {
                itinerary_name: { 
                  contains: value,
                  mode: "insensitive",
                },
            },
            include: {
              user: {
                select: {
                  username: true,
                },
              },
            },
        });
    } else if (option === "Tag") {
        const tags = value.split(' ').map(tag => tag.trim());
        itineraries = await prisma.itineraries.findMany({
            where: {
                itinerary_tags: {
                  hasEvery: tags,
                },
            },
            include: {
              user: {
                select: {
                  username: true,
                },
              },
            },
        });
    } else if (option === "User") {
        itineraries = await prisma.itineraries.findMany({
            where: {
                user: {
                    username: {
                      contains: value,
                    },
                },
            },
            include: {
              user: {
                select: {
                  username: true,
                },
              },
            },
        });
    }
    return itineraries;
}

//Returns all stored itineraries
export async function fetchAllItineraries() {
  return await prisma.itineraries.findMany();
}

// //Return itinerary by Itinerary Name
export async function fetchItineraryByName(name: string) {
  const itineraryByName = await prisma.itineraries.findFirst({
    where: {
      itinerary_name: name,
    },
  });

  return itineraryByName;
}

//Return itinerary by Itinerary ID
export async function fetchItineraryByItineraryID(itinerary_id: number) {
  const itineraryByItineraryID = await prisma.itineraries.findUnique({
    where: {
      itinerary_id: itinerary_id,
    },
  });

  return itineraryByItineraryID;
}

//Return itinerary by Creator ID
// export async function fetchItineraryByCreatorID(id: number) {
//   const itineraryByCreatorID = await prisma.itineraries.findFirst({
//     where: {
//       user_id: id,
//     },
//   });

//   return itineraryByCreatorID;
// }

//Return itineraries by tag
export async function fetchItinerariesWithTags(tags: string[]) {
  if (tags.length > 0) {
    const itinerariesWithTag = await prisma.itineraries.findMany({
      where: {
        itinerary_tags: {
          hasSome: tags,
        },
      },
    });

    return itinerariesWithTag;
  }
}

// //Return itineraries with duration greater than
// export async function fetchItinerariesWithDurationGreaterThan (duration: number) {

//     const itinerariesWhereDuration = await prisma.itineraries.findMany({
//         where: {
//             itinerary_duration: {
//                 gte: duration
//             }
//         }
//     });

//     return itinerariesWhereDuration;
// }

// //Return itineraries with duration less than
// export async function fetchItinerariesWithDurationLessThan (duration: number) {

//     const itinerariesWhereDuration = await prisma.itineraries.findMany({
//         where: {
//             itinerary_duration: {
//                 lte: duration
//             }
//         }
//     });

//     return itinerariesWhereDuration;
// }

// //Return itinerary locations by Itinerary Name
// export async function fetchLocationsByItineraryName (itineraryName: string) {

//     const itineraryLocationsByName = await prisma.itineraries.findFirst({
//         where: {
//             itinerary_name: itineraryName
//         }
//     });

//     return itineraryLocationsByName?.location_ids;
// }

// //Return itinerary locations by Itinerary ID
// export async function fetchLocationsByItineraryId (itineraryID: number) {

//     const itineraryLocationsByItineraryID = await prisma.itineraries.findFirst({
//         where: {
//             itinerary_id: itineraryID
//         }
//     });

//     return itineraryLocationsByItineraryID?.location_ids;
// }

// POST
// Add new itinerary
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

export async function createItinerary(itineraryData: ItineraryData, locationData: []) {
  

  console.log("Provided firebase_uuid:", itineraryData.creator_id);

  // Insert itinerary into the "itineraries" table
  const createdItinerary = await prisma.itineraries.create({
    data: {
      itinerary_id: itineraryData.itinerary_id,
      creator_id: itineraryData.creator_id,
      itinerary_name: itineraryData.itinerary_name,
      itinerary_descr_en: itineraryData.itinerary_descr_en,
      itinerary_descr_jp: itineraryData.itinerary_descr_jp,
      itinerary_tags: itineraryData.itinerary_tags,
    },
  });

  console.log("Created itinerary:", createdItinerary);

  //Get location IDs from objects.
  const itinerary_id: number = itineraryData.itinerary_id;
  const location_ids: number[] = locationData.map((location: Itinerary_locations) => location.loc_id);
  // Insert locations into the "locations" table

    await Promise.all(
    locationData.map(async (location: Itinerary_locations) => {
        const createdLocation = await prisma.itinerary_locations.create({
        data: {
            loc_id: location.loc_id,
            loc_name: location.loc_name,
            associated_itinerary_id: location.associated_itinerary_id,
            creator_id: location.creator_id,
            loc_coords: location.loc_coords,
            loc_descr_en: location.loc_descr_en,
            loc_descr_jp: location.loc_descr_jp,
            loc_tags: [...location.loc_tags],
        },
        });
        console.log("Created location:", createdLocation);
        })
    );

  //Push location IDs to itinerary
    await prisma.itineraries.update({
        where: 
        { itinerary_id: itinerary_id },
        data: {
            associated_loc_ids: location_ids
        }
    })
  

  // Insert itinerary_location records into the "itinerary_location" table
//   const itineraryLocationData = createdLocations.map((location: Itinerary_locations) => ({
//     itinerary_id: createdItinerary.itinerary_id,
//     loc_id: location.loc_id,
//     loc_name: location.loc_name,
//     loc_descr_en: location.loc_descr_en,
//     loc_descr_jp: location.loc_descr_jp,
//   }));

//   await prisma.itinerary_locations.createMany({
//     data: itineraryLocationData,
//   });

  console.log("Inserted itinerary_location records.");
}

//PATCH
//Modify existing itinerary
// export async function modifyItinerary(itinerary: itineraries) {

//     const { itinerary_id } = itinerary;

//     const modifiedItinerary = await prisma.itineraries.update({
//         where: {
//           itinerary_id: itinerary_id
//         },
//         data: {
//             creator_id: itinerary.creator_id,
//             itinerary_name: itinerary.itinerary_name,
//             itinerary_tags: itinerary.itinerary_tags,
//             location_ids: itinerary.location_ids,
//             itinerary_duration: itinerary.itinerary_duration,
//           },
//     })

//     return modifiedItinerary;
// }

// //DELETE
// //Delete itinerary by name
// export async function deleteItineraryByName(itineraryName: string) {
//     // const { itinerary_name } = itinerary;
//     const deleteItinerary = await prisma.itineraries.delete({
//         where: {
//             itinerary_name: itineraryName,
//         }
//     });

//     return deleteItinerary.itinerary_name;
// }

// //Delete itinerary by ID
// export async function deleteItineraryByItineraryID(itineraryID: number) {
//     // const { itinerary_id } = itinerary;
//     const deleteItinerary = await prisma.itineraries.delete({
//         where: {
//             itinerary_id: itineraryID,
//         }
//     });

//     return deleteItinerary.itinerary_id;
// }

// //Delete itinerary by Creator ID
// export async function deleteItineraryByCreatorID(creatorID: number) {
//     // const { creator_id } = itinerary;
//     const deleteItinerary = await prisma.itineraries.deleteMany({
//         where: {
//             creator_id: creatorID,
//         }
//     });

//     return deleteItinerary.count;
// }
