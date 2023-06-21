import { itinerary_location, locations } from "@prisma/client";

export interface Location {
  id: number;
  position: [number, number];
  name: string;
  description: string;
  tags: string[];
}

export interface FirebaseUser {
  uid: string;
  username: string;
  user_email: string;
}

interface ItineraryData {
  firebase_uuid: string;
  itinerary_name: string;
  itinerary_descr: string;
  itinerary_tags: string;
  kinjo_coords: [number, number];
  itinerary_locations: locations[];
}

export interface VisitedMap {
  firebase_uuid: string;
  visited_coords: [number, number];
  visited_name: string;
  visited_descr: string;
}

interface LocationData {
  loc_coords: [number, number];
  loc_name: string;
  loc_descr_en: string;
  loc_tags: string[];
}
