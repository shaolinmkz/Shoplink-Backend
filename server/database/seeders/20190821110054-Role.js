import dotenv from 'dotenv';

dotenv.config();

const {
  USER_ROLE_ID,
  ADMIN_ROLE_ID,
  SUPER_ADMIN_ROLE_ID
} = process.env;


export default {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', await [{
    id: USER_ROLE_ID,
    name: 'user',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  },
  {
    id: ADMIN_ROLE_ID,
    name: 'admin',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  },
  {
    id: SUPER_ADMIN_ROLE_ID,
    name: 'super-admin',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Roles', null, {})
};
