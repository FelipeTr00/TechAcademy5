import { Request, Response } from 'express';
import * as VehicleService from '../service/VehicleService';

export const create = async (req: Request, res: Response) => {
  try {
    const vehicle = await VehicleService.createVehicle(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create vehicle' });
  }
};

export const getByFilters = async (req: Request, res: Response) => {
    const { tipo, ano } = req.body;
  
    try {
      const vehicles = await VehicleService.getVehicleByFilters(
        tipo?.toString(),
        ano ? Number(ano) : undefined
      );
  
      res.json(vehicles);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar veículos' });
    }
  };

export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const vehicle = await VehicleService.getVehicleById(id);
  if (vehicle) {
    res.json(vehicle);
  } else {
    res.status(404).json({ error: 'Vehicle not found' });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await VehicleService.updateVehicle(id, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ error: 'Vehicle not found' });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await VehicleService.deleteVehicle(id);
  if (deleted) {
    res.json({ message: 'Vehicle deleted' });
  } else {
    res.status(404).json({ error: 'Vehicle not found' });
  }
};
