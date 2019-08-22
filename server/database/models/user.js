import dotenv from 'dotenv';

dotenv.config();

const { DEFAULT_PROFILE_IMAGE } = process.env;

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'email already exists',
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address1: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 'n/a',
    },
    address2: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 'n/a',
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'n/a',
    },
    lga: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'n/a',
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'n/a',
    },
    shippingRegion: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'n/a',
    },
    creditCard: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'n/a',
    },
    phone1: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'n/a',
    },
    phone2: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'n/a',
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin', 'super-admin'],
      allowNull: false,
      defaultValue: 'user',
    },
    uniqueToken: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'n/a',
    },
    profileImage: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: DEFAULT_PROFILE_IMAGE,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {});
  User.associate = () => {
    // associations can be defined here
  };
  return User;
};
