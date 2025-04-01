"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getByFipeCode = exports.getByFilters = exports.createVehicle = void 0;
const VehicleService = __importStar(require("../service/VehicleService"));
const VehicleModel_1 = require("../model/VehicleModel");
const createVehicle = async (req, res) => {
    try {
        const vehicle = await VehicleService.createVehicle(req.body);
        res.status(201).json(vehicle);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create vehicle' });
    }
};
exports.createVehicle = createVehicle;
const getByFilters = async (req, res) => {
    try {
        const filters = req.body;
        const vehicles = await VehicleService.getVehicleByFilters(filters);
        res.json(vehicles);
    }
    catch (err) {
        res.status(500).json({ error: 'Error to fetch vehicles.' });
    }
};
exports.getByFilters = getByFilters;
const getByFipeCode = async (req, res) => {
    try {
        const codigoFipe = req.query.CodigoFipe;
        if (!codigoFipe) {
            return res.status(400).json({ error: 'Fipe code is required' });
        }
        const vehicle = await VehicleModel_1.Vehicle.findAll({ where: { CodigoFipe: codigoFipe } });
        return vehicle
            ? res.json(vehicle)
            : res.status(404).json({ error: 'Vehicle not found' });
    }
    catch (err) {
        console.error('[ERROR] Failed to fetch vehicle by Fipe code:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getByFipeCode = getByFipeCode;
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
const update = async (req, res) => {
    const id = Number(req.params.id);
    const updated = await VehicleService.updateVehicle(id, req.body);
    if (updated) {
        res.json(updated);
    }
    else {
        res.status(404).json({ error: 'Vehicle not found' });
    }
};
exports.update = update;
const remove = async (req, res) => {
    const id = Number(req.params.id);
    const deleted = await VehicleService.deleteVehicle(id);
    if (deleted) {
        res.json({ message: 'Vehicle deleted' });
    }
    else {
        res.status(404).json({ error: 'Vehicle not found' });
    }
};
exports.remove = remove;
