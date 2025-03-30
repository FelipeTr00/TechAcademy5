import { DataTypes, Model } from 'sequelize';
import database from "../config";

export class Vehicle extends Model {}

Vehicle.init({
  CodigoFipe: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Tipo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Marca: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Modelo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Combustivel: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  anoModelo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Valor: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  ValorFipe: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
}, {
  sequelize: database,
  modelName: 'Vehicle',
  tableName: 'fipe',
  timestamps: false,
});



