import dotenv from 'dotenv';
import { v4 as generateId } from 'uuid';

dotenv.config();

export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Departments', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: generateId(),
      unique: true
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
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
  down: (queryInterface) => queryInterface.dropTable('Departments')
};
