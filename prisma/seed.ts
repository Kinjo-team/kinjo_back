import { Itinerary_locations, Prisma, PrismaClient, Users } from "@prisma/client";

const prisma = new PrismaClient();

const loc_id_array: number[] = [];

    //Add two test users, testuser1 and testuser2;
    async function seedUsers () {
        prisma.users.deleteMany({ 
            where: {
            firebase_uuid: {
              in: ['9dlfKJg6dweDxeE0mvxWHWZJepA2', '4DLfKJg6dweDxeE0mvxWHWZJepH28']
            }
          }
        });

        const createdUsers = await prisma.users.createMany({
            data: [
                {
                firebase_uuid: '9dlfKJg6dweDxeE0mvxWHWZJepA2',
                username: 'testuser1',
                user_email: 'testuser1@email.com', 
                },
                {
                firebase_uuid: '4DLfKJg6dweDxeE0mvxWHWZJepH28',
                username: 'testuser2',
                user_email: 'testuser2@email.com'
                }
        ],
        skipDuplicates: true,
    })

    console.log("Seeded users to DB", createdUsers);
    };

    //Generate an empty itinerary and attribute it to testuser1 on a dummy firebase ID.
    async function seedItineraries() {
        console.log("Seeding itineraries to DB");
        await prisma.itineraries.deleteMany({
            where: {
                creator_id: '9dlfKJg6dweDxeE0mvxWHWZJepA2'
            }
        })
        await prisma.itineraries.create({
          data: {
            itinerary_id: -1,
            creator: {
              connect: {
                firebase_uuid: '9dlfKJg6dweDxeE0mvxWHWZJepA2',
              },
            },
            itinerary_name: "testItinerary1",
            itinerary_tags: ["test"],
            }
        })
    };

    const seedLocations = [
    {
        creator_uuid: {
            connect: {
                firebase_uuid: '9dlfKJg6dweDxeE0mvxWHWZJepA2'
            }
        },
        loc_id: Math.floor(Date.now() * Math.random()), //randomly generate unique ID
        itinerary_id: {
            connect: {
                itinerary_id: -1,
            }
        },
        loc_name: "TestLocation 1",
        loc_lat: 35.6895,
        loc_long: 139.6917,
        // Add other fields as necessary for the location
    },
    {
        creator_uuid: {
            connect: {
                firebase_uuid: '9dlfKJg6dweDxeE0mvxWHWZJepA2'
            }
        },
        loc_id: Math.floor(Date.now() * Math.random()), //randomly generate unique ID
        itinerary_id: {
            connect: {
                itinerary_id: -1,
            }
        },
        loc_name: "TestLocation 2",
        loc_lat: 35.6892,
        loc_long: 139.6923,
        // Add other fields as necessary for the location
    },
    {   creator_uuid: {
            connect: {
                firebase_uuid: '9dlfKJg6dweDxeE0mvxWHWZJepA2'
            }
        },
        loc_id: Math.floor(Date.now() * Math.random()), //randomly generate unique ID
        itinerary_id: {
            connect: {
                itinerary_id: -1,
            }
        },
        loc_name: "TestLocation 3",
        loc_lat: 35.6885,
        loc_long: 139.6910,
        // Add other fields as necessary for the location
    },
    {   creator_uuid: {
        connect: {
            firebase_uuid: '9dlfKJg6dweDxeE0mvxWHWZJepA2'
            }
        },
        loc_id: Math.floor(Date.now() * Math.random()), //randomly generate unique ID
        itinerary_id: {
            connect: {
                itinerary_id: -1,
            }
        },
        loc_name: "TestLocation 4",
        loc_lat: 35.6898,
        loc_long: 139.6909,
        // Add other fields as necessary for the location
    },
    {   creator_uuid: {
        connect: {
            firebase_uuid: '9dlfKJg6dweDxeE0mvxWHWZJepA2'
            }
        },
        loc_id: (Math.floor(Date.now() * Math.random())), //randomly generate unique ID
        itinerary_id: {
            connect: {
                itinerary_id: -1,
            }
        },
        loc_name: "TestLocation 5",
        loc_lat: 35.6891,
        loc_long: 139.6914,
        // Add other fields as necessary for the location
    },
    ];

    async function seedLocs() {
    
        console.log("Seeding locations to DB")
        await prisma.itinerary_locations.deleteMany({
            where: {
                creator_uuid: '9dlfKJg6dweDxeE0mvxWHWZJepA2'
            },
        });

        for (const location of seedLocations) {
            console.log(location);
            loc_id_array.push(location.loc_id);
            await prisma.itinerary_locations.create({
                data: {
                    creator_uuid: location.creator_uuid.connect.firebase_uuid,
                    loc_id: location.loc_id, //randomly generate unique ID
                    loc_name: location.loc_name,
                    loc_lat: location.loc_lat,
                    loc_long: location.loc_long,
                    itinerary_id: location.itinerary_id.connect.itinerary_id,
            },
        });
        console.log(loc_id_array);
        }
    }

    async function updateTestItinerary() {
        console.log("adding locations to Test Itinerary")
        await prisma.itineraries.update({
            where: {
                itinerary_id: -1,
            },
            data: {
                location_ids: loc_id_array,
            }
        })
    }

async function seed() {
    await seedUsers();
    await seedItineraries();
    await seedLocs();
    await updateTestItinerary();
}

seed()
    .catch((error) => {
    console.error("Error seeding data:", error);
    }).finally(async () => {
        await prisma.$disconnect();

    })