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
  locationData: any;
}

declare global {
  namespace Express {
    interface Request {
      files: any;
    }
  }
}

export interface VisitedMap {
  firebase_uuid: string;
  visited_coords: [number, number];
  visited_name: string;
  visited_descr: string;
}

