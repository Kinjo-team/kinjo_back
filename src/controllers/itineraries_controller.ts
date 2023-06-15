import { Request, Response } from "express";

import {
  fetchItinerariesBySearchOption,
  fetchAllItineraries,
  fetchItineraryByName,
  fetchItineraryByItineraryID,
  // fetchItineraryByCreatorID,
  fetchItinerariesWithTags,
  //   fetchItinerariesWithDurationGreaterThan,
  //   fetchItinerariesWithDurationLessThan,
  //   fetchLocationsByItineraryName,
  fetchLocationsByItineraryId,
  createItinerary,
  //   modifyItinerary,
  //   deleteItineraryByName,
  //   deleteItineraryByItineraryID,
  //   deleteItineraryByCreatorID,
} from "../models/itineraries";

import { Itineraries, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { validationResult } from "express-validator";
import { ItineraryData, LocationData } from "../../globals";
import { create } from "domain";

export const searchItineraries = async (req: Request, res: Response) => {
  const option = req.query.option as string;
  const value = req.query.value as string;

  try {
    const itineraries = await fetchItinerariesBySearchOption(option, value);
    console.log(itineraries)
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(itineraries);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while searching itineraries." });
  }
};

export const getAllItineraries = async (_req: Request, res: Response) => {
  try {
    const itineraries = await fetchAllItineraries();
    console.log(itineraries);
    res.status(200).json(itineraries);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching itineraries." });
  }
};

export const getItineraryByName = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Validation errors occurred
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.params;
  try {
    const itinerary = await fetchItineraryByName(name);
    if (itinerary) {
      res.status(200).json(itinerary);
    } else {
      res.status(404).json({ message: "Itinerary not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the itinerary." });
  }
};

// export const getItineraryByID = async (req: Request, res: Response) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Validation errors occurred
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { id } = req.params;
//   try {
//     const itinerary = await fetchItineraryByID(Number(id));
//     if (itinerary) {
//       res.status(200).json(itinerary);
//     } else {
//       res.status(404).json({ message: "Itinerary not found." });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the itinerary." });
//   }
// };

// export const getItineraryByCreatorID = async (req: Request, res: Response) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Validation errors occurred
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { id } = req.params;
//   try {
//     const itinerary = await fetchItineraryByCreatorID(Number(id));
//     if (itinerary) {
//       res.status(200).json(itinerary);
//     } else {
//       res.status(404).json({ message: "Itinerary not found." });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the itinerary." });
//   }
// };

export const getItinerariesWithTags = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Validation errors occurred
    return res.status(400).json({ errors: errors.array() });
  }

  const { tags } = req.body;
  try {
    const itineraries = await fetchItinerariesWithTags(tags);
    res.status(200).json(itineraries);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching itineraries." });
  }
};

//
export async function getItineraryByItineraryID (req: Request, res: Response) {
  
  const itinerary_id = Number(req.params.id);

try {
  const itinerary: ItineraryData | null = await fetchItineraryByItineraryID(itinerary_id);

  if (itinerary === null) {
    return res.status(404).send("Itinerary not found");
  }
  
  const itinerary_locations = await fetchLocationsByItineraryId(itinerary_id);
  console.log(itinerary);
  console.log(itinerary_locations.length)
  console.log(itinerary_locations);

  itinerary['locationData'] = itinerary_locations


  return res.json(itinerary);

} catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong" });
  } 
};
// export const getItinerariesWithDurationGreaterThan = async (req: Request, res: Response) => {

// const errors = validationResult(req);
// if (!errors.isEmpty()) {
//   // Validation errors occurred
//   return res.status(400).json({ errors: errors.array() });
// }

// const { duration } = req.params;
// try {
//   const itineraries = await fetchItinerariesWithDurationGreaterThan(Number(duration));
//   res.status(200).json(itineraries);
// } catch (error) {
//   res.status(500).json({ error: 'An error occurred while fetching itineraries.' });
// }
// };

// export const getItinerariesWithDurationLessThan = async (req: Request, res: Response) => {

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Validation errors occurred
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { duration } = req.params;
//   try {
//     const itineraries = await fetchItinerariesWithDurationLessThan(Number(duration));
//     res.status(200).json(itineraries);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching itineraries.' });
//   }
// };

// export const getLocationsByItineraryName = async (req: Request, res: Response) => {

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Validation errors occurred
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { itineraryName } = req.params;
//   try {
//     const locations = await fetchLocationsByItineraryName(itineraryName);
//     res.status(200).json(locations);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching the locations.' });
//   }
// };

// export const getLocationsByItineraryId = async (req: Request, res: Response) => {

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Validation errors occurred
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { itineraryID } = req.params;
//   try {
//     const locations = await fetchLocationsByItineraryId(Number(itineraryID));
//     res.status(200).json(locations);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching the locations.' });
//   }
// };

export const addItinerary = async (req: Request, res: Response) => {


  const itineraryData: ItineraryData = req.body;

  if (itineraryData.locationData !== undefined) {

    const locationData: LocationData[] = itineraryData.locationData;

    try { 
      
      await createItinerary(itineraryData, locationData);
      res.json({ message: "Itinerary and locations created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    } else {

      try {
        
        await createItinerary(itineraryData);
        res.json({ message: "Added itinerary only" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
    

};

// export const updateItinerary = async (req: Request, res: Response) => {

//   const itinerary: itineraries = req.body;
//   try {
//     const modifiedItinerary = await modifyItinerary(itinerary);
//     res.status(200).json(modifiedItinerary);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while modifying the itinerary.' });
//   }
// };

// export const delItineraryByName = async (req: Request, res: Response) => {

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Validation errors occurred
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { itineraryName } = req.params;
//   try {
//     const deletedItineraryName = await deleteItineraryByName(itineraryName);
//     res.status(200).json(deletedItineraryName);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while deleting the itinerary.' });
//   }
// };

// export const delItineraryByItineraryID = async (req: Request, res: Response) => {

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Validation errors occurred
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { itineraryID } = req.params;
//   try {
//     const deletedItineraryID = await deleteItineraryByItineraryID(Number(itineraryID));
//     res.status(200).json(deletedItineraryID);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while deleting the itinerary.' });
//   }
// };

// export const delItineraryByCreatorID = async (req: Request, res: Response) => {

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Validation errors occurred
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { creatorID } = req.params;
//   try {
//     const deletedItinerariesCount = await deleteItineraryByCreatorID(Number(creatorID));
//     res.status(200).json(deletedItinerariesCount);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while deleting the itineraries.' });
//   }
// };
