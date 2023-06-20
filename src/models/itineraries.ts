import { prisma } from "../server";
import { ItineraryData } from "../../globals";
import { getDistanceFromLatLonInKm } from "../utils/getDistanceFromLatLonInKm";

interface LocationData {
  loc_coords: [number, number];
  loc_name: string;
  loc_descr_en: string;
  loc_tags: string[];
  loc_image_url: string;
}

//GET
// Return itineraries by search option
export async function fetchItinerariesBySearchOption(
  option: string,
  value: string
) {
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
    const tags = value.split(" ").map((tag) => tag.trim());
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

// Return itineraries from a specific user
export async function fetchItinerariesByFirebaseID(firebase_id: string) {
  const itinerariesByUser = await prisma.itineraries.findMany({
    where: {
      user: {
        firebase_uuid: firebase_id,
      },
    },
  });
  return itinerariesByUser;
};

// //Return itinerary by Itinerary ID
// export async function fetchItineraryByID(id: number) {
//   const itineraryByItineraryID = await prisma.itineraries.findFirst({
//     where: {
//       itinerary_id: id,
//     },
//   });

//   return itineraryByItineraryID;
// }

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

export async function createItinerary(data: ItineraryData) {
  const {
    firebase_uuid,
    itinerary_name,
    itinerary_descr,
    itinerary_tags,
    kinjo_coords,
    locationData,
  } = data;

  console.log("Provided firebase_uuid:", firebase_uuid);

  // Insert itinerary into the "itineraries" table
  const createdItinerary = await prisma.itineraries.create({
    data: {
      firebase_uuid,
      itinerary_name,
      itinerary_descr,
      itinerary_tags,
      kinjo_coords,
    },
  });

  console.log("Created itinerary:", createdItinerary);

  // Insert locations into the "locations" table
  const createdLocations = await Promise.all(
    locationData.map(async (location: LocationData) => {
      const createdLocation = await prisma.locations.create({
        data: {
          loc_name: location.loc_name,
          loc_coords: location.loc_coords,
          loc_descr_en: location.loc_descr_en,
          loc_tags: [...location.loc_tags],
          loc_image_url: location.loc_image_url,
        },
      });

      console.log("Created location:", createdLocation);

      return createdLocation;
    })
  );

  // Insert itinerary_location records into the "itinerary_location" table
  const itineraryLocationData = createdLocations.map((location) => ({
    itinerary_id: createdItinerary.itinerary_id,
    location_id: location.loc_id,
  }));

  await prisma.itinerary_location.createMany({
    data: itineraryLocationData,
  });

  console.log("Inserted itinerary_location records.");
}

//Nearby locations

export async function fetchNearbyItineraries(lat: number, lon: number) {
  const itineraries = await prisma.itineraries.findMany();

  const nearbyItineraries = itineraries.filter((itinerary) => {
    const [itinLat, itinLon] = itinerary.kinjo_coords;
    const distance = getDistanceFromLatLonInKm(lat, lon, itinLat, itinLon);
    return distance <= 5;
  });

  return nearbyItineraries;
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
