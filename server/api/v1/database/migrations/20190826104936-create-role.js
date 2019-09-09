import { v4 as generateId } from 'uuid';

export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Roles', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: generateId(),
      unique: true
    },
    name: {
      type: Sequelize.ENUM,
      values: ['user', 'admin', 'super-admin'],
      allowNull: false,
      unique: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Roles')
};
