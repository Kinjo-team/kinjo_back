import { prisma } from "../server";
import { ItineraryData } from "../../globals";
import { getDistanceFromLatLonInKm } from "../utils/getDistanceFromLatLonInKm";

interface LocationData {
  loc_coords: [number, number];
  loc_name: string;
  loc_descr_en: string;
  loc_tags: string[];
  loc_image_url: any;
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
            user_img: true,
          },
        },
        likes: {
          select: {
            like: true,
            dislike: true,
          }
        }
      },
    });
  } else if (option === "Tag") {
    const tags = value.split(" ").map((tag) => tag.trim().toLowerCase());
    // const tags =value.split(" ").join(" | ");

    const itineraryLocations = await prisma.itinerary_location.findMany({
      where: {
        location: {
          loc_tags: {
            hasSome: tags,
          },
        },
      },
      select: {
        itinerary_id: true,
      },
    });

    const itineraryIds = itineraryLocations.map(il => il.itinerary_id);

    itineraries = await prisma.itineraries.findMany({
      where: {
        OR: [
          {
            itinerary_tags: {
              hasSome: tags,
            },
          },
          {
            itinerary_id: {
              in: itineraryIds,
            },
          },
        ],
      },
      include: {
        user: {
          select: {
            username: true,
            user_img: true,
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
            mode: "insensitive",
          },
        },
      },
      include: {
        user: {
          select: {
            username: true,
            user_img: true,
          },
        },
      },
    });
  }
  return itineraries;
}

// Model
export async function fetchPredictedSearchTerms(option: string, value: string) {
  value = value.toLowerCase();
  
  let terms: any = [];
  
  if (option === "Name") {
    const itineraries = await prisma.itineraries.findMany({
      where: {
        itinerary_name: {
          startsWith: value,
          mode: "insensitive",
        },
      },
      select: {
        itinerary_name: true,
      },
    });

    terms = itineraries.map(itinerary => itinerary.itinerary_name);
  } else if (option === "Tag") {
    const locations = await prisma.locations.findMany({
      select: {
        loc_tags: true,
      },
    });

    // Flatten the tags array and filter by the search value
    terms = locations.flatMap(location => location.loc_tags)
      .filter(tag => tag.toLowerCase().startsWith(value));
  } else if (option === "User") {
    const users = await prisma.users.findMany({
      where: {
        username: {
          startsWith: value,
          mode: "insensitive",
        },
      },
      select: {
        username: true,
      },
    });

    terms = users.map(user => user.username);
  }

  return terms;
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
}

// Return itineraries from a specific user by username
export async function fetchItinerariesByUsername(username: string) {
  const itinerariesByUser = await prisma.itineraries.findMany({
    where: {
      user: {
        username: username,
      },
    },
  });
  return itinerariesByUser;
}

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
    itinerary_image_url,
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
      itinerary_image_url
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
  return createdItinerary.itinerary_id;
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

// DELETE
// Delete itinerary by id (and all associated locations)
export async function deleteItineraryById(id: number) {
  // Find the itinerary to be deleted
  const itinerary = await prisma.itineraries.findUnique({
    where: {
      itinerary_id: id,
    },
    include: {
      itinerary_locations: true,
    },
  });

  if (!itinerary) {
    throw new Error("Itinerary not found");
  }

  // Delete all associated records in related tables
  await prisma.itinerary_location.deleteMany({
    where: {
      itinerary_id: id,
    },
  });

  await prisma.likes.deleteMany({
    where: {
      itinerary_id: id,
    },
  });

  await prisma.bookmarks.deleteMany({
    where: {
      itinerary_id: id,
    },
  });

  await prisma.comments.deleteMany({
    where: {
      itinerary_id: id,
    },
  });

  // Delete the itinerary
  await prisma.itineraries.delete({
    where: {
      itinerary_id: id,
    },
  });

  // Delete associated locations if they are no longer used in other itineraries
  for (const location of itinerary.itinerary_locations) {
    const usedInOtherItinerary = await prisma.itinerary_location.findFirst({
      where: {
        location_id: location.location_id,
        NOT: {
          itinerary_id: id,
        },
      },
    });

    if (!usedInOtherItinerary) {
      await prisma.locations.delete({
        where: {
          loc_id: location.location_id,
        },
      });
    }
  }
}