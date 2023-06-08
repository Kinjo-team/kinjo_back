import { Request, Response } from 'express';
import { Itinerary_locations } from '@prisma/client';
import {
  fetchAllLocations,
  fetchLocationByLocationID,
  fetchLocationsByCreatorID,
  fetchLocationsByLocationName,
  fetchLocationsByTags,
  fetchLocationsWithDurationGreaterThan,
  fetchLocationsWithDurationLessThan,
  createItineraryLocation,
  updateItineraryLocation,
  deleteItineraryByItineraryID,
  deleteItineraryByCreatorID,
} from '../models/locations';

export const getAllLocations = async (_req: Request, res: Response) => {
  try {
    const locations = await fetchAllLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching locations.' });
  }
};

export const getLocationByLocationID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const location = await fetchLocationByLocationID(Number(id));
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ message: 'Location not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the location.' });
  }
};

export const getLocationsByCreatorID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const locations = await fetchLocationsByCreatorID(Number(id));
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the locations.' });
  }
};

export const getLocationsByLocationName = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const locations = await fetchLocationsByLocationName(name);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the locations.' });
  }
};

export const getLocationsByTags = async (req: Request, res: Response) => {
  const { tags } = req.body;
  try {
    const locations = await fetchLocationsByTags(tags);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the locations.' });
  }
};

export const getLocationsWithDurationGreaterThan = async (req: Request, res: Response) => {
  const { duration } = req.body;
  try {
    const locations = await fetchLocationsWithDurationGreaterThan(duration);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the locations.' });
  }
};

export const getLocationsWithDurationLessThan = async (req: Request, res: Response) => {
  const { duration } = req.body;
  try {
    const locations = await fetchLocationsWithDurationLessThan(duration);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the locations.' });
  }
};

export const addLocation = async (req: Request, res: Response) => {
    const location: Itinerary_locations = req.body;
    try {
      const newLocation = await createItineraryLocation(location);
      res.json(newLocation);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the location.' });
    }
  };
  
  export const updateLocation = async (req: Request, res: Response) => {
    const location: Itinerary_locations = req.body;
    try {
      const modifiedLocation = await updateItineraryLocation(location);
      res.json(modifiedLocation);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while modifying the location.' });
    }
  };
  
  export const deleteLocationByLocationID = async (req: Request, res: Response) => {
    const { locationID } = req.params;
    try {
      const deletedLocation = await deleteItineraryByItineraryID(Number(locationID));
      res.json(deletedLocation);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the location.' });
    }
  };
  
  export const deleteLocationsByCreatorID = async (req: Request, res: Response) => {
    const { creatorID } = req.params;
    try {
      const deletedLocationsCount = await deleteItineraryByCreatorID(Number(creatorID));
      res.json(deletedLocationsCount);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the locations.' });
    }
  };