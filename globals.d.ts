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
  creator_id: string;
  itinerary_name: string;
  itinerary_descr_en: string;
  itinerary_descr_jp?: string | null;
  itinerary_tags: string[];
  locationData?: LocationData[];
}

export interface LocationData {
  loc_id : number,
  loc_coords: number[];
  creator_id: string;
  associated_itinerary_id: number;
  loc_name: string;
  loc_descr_en: string;
  loc_tags: string[];
  loc_address?: string | null,
  loc_descr_jp?: string | null,
  loc_duration?: number | undefined,
  loc_imgUrls?: string | undefined,
}