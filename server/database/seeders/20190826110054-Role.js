import { v4 as generateId } from 'uuid';

export default {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', await [{
    id: generateId(),
    name: 'user',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  },
  {
    id: generateId(),
    name: 'admin',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  },
  {
    id: generateId(),
    name: 'super-admin',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Roles', null, {})
};
