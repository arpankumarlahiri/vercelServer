import { Sequelize, DataTypes } from 'sequelize';
import * as bcrypt from 'bcrypt';

function User(sequelize: Sequelize) {
  return sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (user: any) => {
          user.password = await bcrypt.hash(user.password, 10);
        },
      },
    },
  );
}

export default User;
