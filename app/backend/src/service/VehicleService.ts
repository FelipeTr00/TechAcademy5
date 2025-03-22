import { Vehicle } from '../model/VehicleModel';

export const createVehicle = async (data: any) => {
  return await Vehicle.create(data);
};

export const getVehicleByFilters = async (tipo?: string, anoModelo?: number) => {
    const whereClause: any = {};
  
    if (tipo) whereClause.Tipo = tipo;
    if (anoModelo) whereClause.anoModelo = anoModelo;
  
    return await Vehicle.findAll({ where: whereClause });
  };

export const getVehicleById = async (id: number) => {
  return await Vehicle.findByPk(id);
};

export const updateVehicle = async (id: number, data: any) => {
  const vehicle = await Vehicle.findByPk(id);
  if (!vehicle) return null;
  return await vehicle.update(data);
};

export const deleteVehicle = async (id: number) => {
  const vehicle = await Vehicle.findByPk(id);
  if (!vehicle) return null;
  await vehicle.destroy();
  return vehicle;
};
