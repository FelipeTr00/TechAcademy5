import { Vehicle } from '../model/VehicleModel';

export const createVehicle = async (data: any) => {
  return await Vehicle.create(data);
};

type VehicleFilters = {
  CodigoFipe?: string;
  Tipo?: string;
  Marca?: string;
  Modelo?: string;
  Combustivel?: string;
  anoModelo?: number;
  Valor?: string;
  ValorFipe?: string;
};

export const getVehicleByFilters = async (filters: VehicleFilters) => {
  const whereClause: any = {};

  for (const key in filters) {
    if (filters[key as keyof VehicleFilters] !== undefined) {
      whereClause[key] = filters[key as keyof VehicleFilters];
    }
  }

  return await Vehicle.findAll({ where: whereClause });
};
/*
  export const getVehicleByCodigoFipe = async (CodigoFipe: string) => {
    return await Vehicle.findOne({
      where: { CodigoFipe: CodigoFipe },
    });
  };
*/
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
