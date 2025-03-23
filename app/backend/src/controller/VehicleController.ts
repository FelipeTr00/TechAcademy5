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

  /*
port const getByCodigoFipe = async (req: Request, res: Response) => {
  const CodigoFipe = req.body.CodigoFipe; // ou req.query.codigoFipe / req.params.codigoFipe

  if (!CodigoFipe) {
    return res.status(400).json({ error: 'Código Fipe não informado' });
  }

  const vehicle = await VehicleService.getVehicleByCodigoFipe(CodigoFipe);

  if (vehicle) {
    res.json(vehicle);
  } else {
    res.status(404).json({ error: 'Veículo não encontrado' });
  }
};
*/

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
