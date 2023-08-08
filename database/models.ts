// database/models.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from './config';

interface UserAttributes {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public firstName!: string;
  public lastName!: string;
  public username!: string;
  public email!: string;
  public password!: string;

  static initializeModel() {
    User.init(
      {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User',
      }
    );
  }
}

export default User;
