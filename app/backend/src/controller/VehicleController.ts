import { Request, Response } from 'express';
import * as VehicleService from '../service/VehicleService';
import { Vehicle } from '../model/VehicleModel';

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await VehicleService.createVehicle(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create vehicle' });
  }
};

export const getByFilters = async (req: Request, res: Response) => {
  try {
    const filters = req.body;

    const vehicles = await VehicleService.getVehicleByFilters(filters);

    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: 'Error to fetch vehicles.' });
  }
};


export const getByFipeCode = async (req: Request, res: Response) => {
  try {
    const codigoFipe = req.query.CodigoFipe as string;

    if (!codigoFipe) {
      return res.status(400).json({ error: 'Fipe code is required' });
    }

    const vehicle = await Vehicle.findAll({ where: { CodigoFipe: codigoFipe } });

    return vehicle
      ? res.json(vehicle)
      : res.status(404).json({ error: 'Vehicle not found' });
  } catch (err) {
    console.error('[ERROR] Failed to fetch vehicle by Fipe code:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const updateVehicle = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await VehicleService.updateVehicle(id, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ error: 'Vehicle not found' });
  }
};

export const destroyVehicle = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await VehicleService.deleteVehicle(id);
  if (deleted) {
    res.json({ message: 'Vehicle deleted' });
  } else {
    res.status(404).json({ error: 'Vehicle not found' });
  }
};
