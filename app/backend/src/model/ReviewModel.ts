import { DataTypes, Model, Optional } from "sequelize";
import database from "../config";

export interface IReview {
  id: number;
  title: string;
  content: string;
  rating?: number;
  userId: number; // FK para o autor da revieww
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReviewAttributes
  extends Optional<IReview, "id" | "createdAt" | "updatedAt" | "rating"> {}

export class Review
  extends Model<IReview, IReviewAttributes>
  implements IReview
{
  public id!: number;
  public title!: string;
  public content!: string;
  public rating?: number;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "review",
    sequelize: database,
  }
);

export default Review;
