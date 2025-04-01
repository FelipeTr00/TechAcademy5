"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
class Vehicle extends sequelize_1.Model {
}
exports.Vehicle = Vehicle;
Vehicle.init({
    CodigoFipe: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    Tipo: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    Marca: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    Modelo: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    Combustivel: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    anoModelo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    Valor: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    ValorFipe: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
}, {
    sequelize: config_1.default,
    modelName: 'Vehicle',
    tableName: 'fipe',
    timestamps: false,
});
