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
  itinerary_name: string;
  itinerary_descr: string;
  itinerary_tags: string;
  user_id: number;
  locationData: any;
}
