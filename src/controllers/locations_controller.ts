import { Request, Response } from "express";
import {
  fetchAllLocations,
  //   fetchLocationByLocationID,
  //   fetchLocationsByCreatorID,
  fetchLocationsByLocationName,
  // fetchLocationsByTags,
  //   fetchLocationsWithDurationGreaterThan,
  //   fetchLocationsWithDurationLessThan,
  // createItineraryLocation,
  // updateItineraryLocation,
  // deleteLocationsByItineraryID,
  // deleteLocationsByCreatorID,
} from "../models/locations";
import { validationResult } from "express-validator";

export const getAllLocations = async (_req: Request, res: Response) => {
  try {
    const locations = await fetchAllLocations();
    res.status(200).json(locations);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching locations." });
  }
};

// export const getLocationByLocationID = async (req: Request, res: Response) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Validation errors occurred
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { id } = req.params;
//   try {
//     const location = await fetchLocationByLocationID(Number(id));
//     if (location) {
//       res.status(200).json(location);
//     } else {
//       res.status(404).json({ message: "Location not found." });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the location." });
//   }
// };

// export const getLocationsByCreatorID = async (req: Request, res: Response) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Validation errors occurred
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { id } = req.params;
//   try {
//     const locations = await fetchLocationsByCreatorID(Number(id));
//     res.status(200).json(locations);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the locations." });
//   }
// };

export const getLocationsByLocationName = async (
  req: Request,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Validation errors occurred
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.params;
  try {
    const locations = await fetchLocationsByLocationName(name);
    res.status(200).json(locations);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the locations." });
  }
};

// export const getLocationsByTags = async (req: Request, res: Response) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Validation errors occurred
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { tags } = req.body;
//   try {
//     const locations = await fetchLocationsByTags(tags);
//     res.status(200).json(locations);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the locations." });
//   }
// };

// export const getLocationsWithDurationGreaterThan = async (
//   req: Request,
//   res: Response
// ) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Validation errors occurred
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { duration } = req.params;
//   try {
//     const locations = await fetchLocationsWithDurationGreaterThan(
//       Number(duration)
//     );
//     res.status(200).json(locations);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the locations." });
//   }
// };

// export const getLocationsWithDurationLessThan = async (
//   req: Request,
//   res: Response
// ) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Validation errors occurred
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { duration } = req.params;
//   try {
//     const locations = await fetchLocationsWithDurationLessThan(
//       Number(duration)
//     );
//     res.status(200).json(locations);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the locations." });
//   }
// };

// export const addLocation = async (req: Request, res: Response) => {
//   const location: locations = req.body;
//   try {
//     const newLocation = await createItineraryLocation(location);
//     res.status(201).json(newLocation);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while creating the location." });
//   }

//   try {
//     const newLocation = await createItineraryLocation(location);
//     res.status(201).json(newLocation);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while creating the location." });
//   }
// };

// export const updateLocation = async (req: Request, res: Response) => {
//   const location: locations = req.body;
//   try {
//     const modifiedLocation = await updateItineraryLocation(location);
//     res.status(200).json(modifiedLocation);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while modifying the location." });
//   }
// };

// export const deleteLocByLocID = async (req: Request, res: Response) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Validation errors occurred
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { locationID } = req.params;
//   try {
//     const deletedLocation = await deleteLocationsByItineraryID(
//       Number(locationID)
//     );
//     res.status(200).json(deletedLocation);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while deleting the location." });
//   }
// };

// export const deleteLocsByCreatorID = async (req: Request, res: Response) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Validation errors occurred
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { creatorID } = req.params;
//   try {
//     const deletedLocationsCount = await deleteLocationsByCreatorID(
//       Number(creatorID)
//     );
//     res.status(200).json(deletedLocationsCount);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while deleting the locations." });
//   }
// };
