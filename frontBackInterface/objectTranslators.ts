import { LocationData, CreateItineraryData } from "../globals";
import { Request } from "express";
import { Itineraries, Itinerary_locations } from "@prisma/client";
import { parse } from "path";

// Convert an object received from the front end to fit back end logic & DB.
// Receives the contents of req.body, splitting these into compatible Itineraries and Itineraries_Locations Entries

interface ParsedCreateItineraryRequest {
    itinerary: Itineraries;
    locations: Itinerary_locations[];
    itinerary_id: number;
    location_ids: number[];
  }

export function frontToBack(req: Request): ParsedCreateItineraryRequest {

    const itineraryID: number = req.body.itinerary_id;
    const loc_ids: number[] = req.body.locationData.map((location: { id: number; }) => location.id);
    const locObjArr: LocationData[] = req.body.locationData

    const parsedItinerary: Itineraries = {
        itinerary_id: req.body.itinerary_id,
        creator_id: req.body.firebase_uuid,
        itinerary_name: req.body.itinerary_name,
        itinerary_descr_en: req.body.itinerary_descr_en ? req.body.itinerary_descr_en : "NO EN DESC",
        itinerary_descr_jp:req.body.itinerary_descr_jp ? req.body.itinerary_descr_jp : "NO EN DESC",
        itinerary_tags: req.body.itinerary_tags,
        location_ids: [],
        itinerary_duration: NaN,
    };

    //Iterate over objects in locObjArr and parse into an array of Itinerary_location objects:
    const parsedLocObjects: Itinerary_locations[] = [];

    for (let location of locObjArr) {

        if (location.creator_id !== undefined){
        let parsedLocation: Itinerary_locations = {
            loc_id: Number(location.id),
            creator_uuid: location.creator_id,
            itinerary_id: itineraryID,
            loc_name: location.loc_name,
            loc_lat: location.loc_coords[0],
            loc_long: location.loc_coords[1],
            loc_coords: location.loc_coords,
            loc_tags: location.loc_tags,
            loc_address: location.loc_address === undefined ? null : location.loc_address,
            loc_descr_en: location.loc_descr_en,
            loc_descr_jp: location.loc_descr_en,
            loc_duration: location.loc_duration === undefined ? null : location.loc_duration,
            loc_imgUrls: location.loc_imgUrls === undefined ? [] : [location.loc_imgUrls],
        };

            parsedLocObjects.push(parsedLocation)
        }
    }

    return {
        itinerary: parsedItinerary,
        locations: parsedLocObjects,
        itinerary_id: itineraryID,
        location_ids: loc_ids,
    }
}

export function backToFront(dbItineraryObject: Itineraries, dbItineraryLocationsObject: Itinerary_locations[]) {

    const parsedDbItineraryLocationsArray: LocationData[] = [];
    
    for (let location of dbItineraryLocationsObject) {
        let parsedLocation = {
        creator_id: location.creator_uuid,
        id: location.loc_id,
        itinerary_id: location.itinerary_id ? location.itinerary_id : undefined,
        loc_name: location.loc_name,
        loc_coords: [location.loc_lat, location.loc_long],
        loc_descr_en: location.loc_descr_en ? location.loc_descr_en : "NO DESC",
        loc_descr_ja: location.loc_descr_jp,
        loc_tags: location.loc_tags,
    }
    parsedDbItineraryLocationsArray.push(parsedLocation);
    }

    const parsedDbItineraryObject: CreateItineraryData = {

        firebase_uuid: dbItineraryObject.creator_id,
        itinerary_id: dbItineraryObject.itinerary_id,
        itinerary_name: dbItineraryObject.itinerary_name,
        itinerary_descr: dbItineraryObject.itinerary_descr_en ? dbItineraryObject.itinerary_descr_en : "NO DESC",
        itinerary_tags: dbItineraryObject.itinerary_tags,
        enteredTag: "",
        locationData: parsedDbItineraryLocationsArray
    } 

    return parsedDbItineraryObject;
} 