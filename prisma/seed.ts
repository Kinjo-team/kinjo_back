import { PrismaClient, Itinerary_locations } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create users
    const user1 = await prisma.users.create({
      data: {
        firebase_uuid: 'IkZ2q7JZw8NLvaomehtjrnkG6Rx1',
        username: 'testUser',
        user_email: 'a.fisherZZZ@gmail.com',
      },
    });

    const user2 = await prisma.users.create({
      data: {
        firebase_uuid: 'user2_uuid',
        username: 'user2',
        user_email: 'user2@example.com',
      },
    });

    const user3 = await prisma.users.create({
      data: {
        firebase_uuid: 'user3_uuid',
        username: 'user3',
        user_email: 'user3@example.com',
      },
    });

    // Create itinerary
    const itinerary = await prisma.itineraries.create({
      data: {
        itinerary_id: -1,
        firebase_uuid: user1.firebase_uuid,
        itinerary_name: 'test Itinerary',
        itinerary_descr_en: 'Description of test itinerary',
        itinerary_tags: ['tag1', 'tag2'],
      },
    });

    // Create locations
    const locationsData = [
      {
        loc_id: -1,
        itinerary_id: -1,
        loc_name: 'Location 1',
        loc_coords: [35.68231467958597, 139.67158075048235],
        loc_descr_en: 'Location description 1',
        loc_tags: ['tag1', 'tag2'],
      },
      {
        loc_id: -2,
        itinerary_id: -1,
        loc_name: 'Location 2',
        loc_coords: [35.67492432001993, 139.71073714388083],
        loc_descr_en: 'Location description 2',
        loc_tags: ['tag3', 'tag4'],
      },
      // Add more locations as needed
    ];

    const createdLocations = await prisma.itinerary_locations.createMany({
      data: locationsData,
    });

    // Create itinerary_location records
    // const itineraryLocationsData = createdLocations.map((location) => ({
    //   itinerary_id: itinerary.itinerary_id,
    //   location_id: location.loc_id,
    // }));

    // await prisma.itinerary_location.createMany({
    //   data: itineraryLocationsData,
    // });

    console.log('Seed data created successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
