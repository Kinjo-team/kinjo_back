import { Request, Response } from "express";
import { itineraries } from "@prisma/client";
import {
  fetchAllItineraries,
  fetchItineraryByName,
  fetchItineraryByID,
  fetchItineraryByCreatorID,
  fetchItinerariesWithTags,
  //   fetchItinerariesWithDurationGreaterThan,
  //   fetchItinerariesWithDurationLessThan,
  //   fetchLocationsByItineraryName,
  //   fetchLocationsByItineraryId,
  //   createItinerary,
  //   modifyItinerary,
  //   deleteItineraryByName,
  //   deleteItineraryByItineraryID,
  //   deleteItineraryByCreatorID,
} from "../models/itineraries";

import { validationResult } from "express-validator";

export const getAllItineraries = async (_req: Request, res: Response) => {
  try {
    const itineraries = await fetchAllItineraries();
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

export const getItineraryByID = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Validation errors occurred
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  try {
    const itinerary = await fetchItineraryByID(Number(id));
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

export const getItineraryByCreatorID = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Validation errors occurred
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  try {
    const itinerary = await fetchItineraryByCreatorID(Number(id));
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

// export const addItinerary = async (req: Request, res: Response) => {

//   const itinerary: itineraries = req.body;
//   try {
//     const newItinerary = await createItinerary(itinerary);
//     res.status(201).json(newItinerary);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while creating the itinerary.' });
//   }
// };

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
