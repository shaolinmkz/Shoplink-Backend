import dotenv from 'dotenv';
import { v4 as generateId } from 'uuid';

dotenv.config();

const { DEFAULT_PROFILE_IMAGE: defaultProfileImage, USER_ROLE_ID } = process.env;

export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: generateId(),
      unique: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    address1: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: 'n/a',
    },
    address2: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: 'n/a',
    },
    state: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'n/a',
    },
    lga: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'n/a',
    },
    postalCode: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'n/a',
    },
    shippingRegion: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'n/a',
    },
    creditCard: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'n/a',
    },
    phone1: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'n/a',
    },
    phone2: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'n/a',
    },
    role: {
      type: Sequelize.ENUM,
      values: ['user', 'admin', 'super-admin'],
      allowNull: false,
      defaultValue: 'user',
    },
    roleId: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: USER_ROLE_ID,
      references: {
        model: 'Roles',
        key: 'id'
      }
    },
    uniqueToken: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: 'n/a',
    },
    profileImage: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: defaultProfileImage,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    isEmailVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    isSocialMediaAuth: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Users')
};
