"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicle = exports.updateVehicle = exports.getVehicleByFilters = exports.createVehicle = void 0;
const VehicleModel_1 = require("../model/VehicleModel");
const createVehicle = async (data) => {
    return await VehicleModel_1.Vehicle.create(data);
};
exports.createVehicle = createVehicle;
const getVehicleByFilters = async (filters) => {
    const whereClause = {};
    for (const key in filters) {
        if (filters[key] !== undefined) {
            whereClause[key] = filters[key];
        }
    }
    return await VehicleModel_1.Vehicle.findAll({ where: whereClause });
};
exports.getVehicleByFilters = getVehicleByFilters;
/*
  export const getVehicleByCodigoFipe = async (CodigoFipe: string) => {
    return await Vehicle.findOne({
      where: { CodigoFipe: CodigoFipe },
    });
  };
*/
const updateVehicle = async (id, data) => {
    const vehicle = await VehicleModel_1.Vehicle.findByPk(id);
    if (!vehicle)
        return null;
    return await vehicle.update(data);
};
exports.updateVehicle = updateVehicle;
const deleteVehicle = async (id) => {
    const vehicle = await VehicleModel_1.Vehicle.findByPk(id);
    if (!vehicle)
        return null;
    await vehicle.destroy();
    return vehicle;
};
exports.deleteVehicle = deleteVehicle;
