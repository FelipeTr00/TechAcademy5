"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRepository_1 = require("../repository/UserRepository");
class User extends sequelize_1.Model {
    async validatePassword(passwdPlain) {
        return await bcrypt_1.default.compare(passwdPlain, this.passwd);
    }
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
            is: {
                args: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                msg: "Invalid email format",
            },
        },
    },
    passwd: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: sequelize_1.DataTypes.STRING(14),
        allowNull: false,
        unique: true,
        validate: {
            isCpfValid(value) {
                if (!(0, UserRepository_1.isValidCPF)(value)) {
                    throw new Error("CPF inválido");
                }
            },
        },
    },
    access: {
        type: sequelize_1.DataTypes.ENUM("user", "admin", "guest"),
        allowNull: false,
        defaultValue: "user",
    },
}, {
    tableName: "user",
    sequelize: config_1.default,
    hooks: {
        beforeCreate: async (user) => {
            user.passwd = await bcrypt_1.default.hash(user.passwd, 10);
        },
        beforeUpdate: async (user) => {
            if (user.changed("passwd")) {
                user.passwd = await bcrypt_1.default.hash(user.passwd, 10);
            }
        },
    },
});
exports.default = User;
async function createTestUser() {
    try {
        const newtestUser = await User.create({
            name: "Teste Ok",
            email: "test@email.com",
            passwd: "passwd",
            cpf: "12918218057",
            access: "admin",
        });
        console.log(newtestUser);
    }
    catch (error) {
        // console.log(error);
    }
}
createTestUser();
