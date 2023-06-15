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
  itinerary_id: number;
  firebase_uuid: string;
  itinerary_name: string;
  itinerary_descr: string;
  itinerary_tags: string;
  locationData: [];
  itinerary_descr_en: string;
  itinerary_descr_jp: string;
}

export interface LocationData {
  loc_id : number,
  loc_coords: number[];
  creator_id?: string | undefined;
  itinerary_id?: number | undefined;
  loc_name: string;
  loc_descr_en: string;
  loc_tags: string[];
  loc_address?: string | null,
  loc_descr_jp?: string | undefined,
  loc_duration?: number | undefined,
  loc_imgUrls?: string | undefined,
}