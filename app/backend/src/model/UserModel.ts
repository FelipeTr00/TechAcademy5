import { Model, DataTypes, Optional } from "sequelize";
import database from "../config"; 
import bcrypt from "bcrypt";
import { isValidCPF } from "../repository/UserRepository";

export interface IUser {
  id: number;
  name: string;
  email: string;
  passwd: string;
  cpf: string;
  access: "user" | "admin" | "guest";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserAttributes extends Optional<IUser, "id" | "createdAt" | "updatedAt"> {}

export class User extends Model<IUser, IUserAttributes> implements IUser {
  public id!: number;
  public name!: string;
  public email!: string;
  public passwd!: string;
  public cpf!: string;
  public access!: "user" | "admin" | "guest";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async validatePassword(passwdPlain: string): Promise<boolean> {
    return await bcrypt.compare(passwdPlain, this.passwd);
  }

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
      validate: {
        isCpfValid(value: string) {
          if (!isValidCPF(value)) {
            throw new Error("CPF inválido");
          }
        },
      },
    },
    access: {
      type: DataTypes.ENUM("user", "admin", "guest"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    tableName: "user",
    sequelize: database,
    hooks: {
      beforeCreate: async (user: User) => {
        user.passwd = await bcrypt.hash(user.passwd, 10);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed("passwd")) {
          user.passwd = await bcrypt.hash(user.passwd, 10);
        }
      },
    },
  }
);

export default User;


async function createTestUser() {
  try {
    const newtestUser = await User.create({
      name: "Test",
      email: "test@email.com",
      passwd: "passwd",
      cpf: "12918218057",
      access: "admin",
    });
    console.log(newtestUser);
  } catch (error) {
    // console.log(error);
     }
}

createTestUser();
