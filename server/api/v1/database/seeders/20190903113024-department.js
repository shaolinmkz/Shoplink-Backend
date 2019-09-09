import dotenv from 'dotenv';
import { v4 as generateId } from 'uuid';

dotenv.config();

export default {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Departments', await [{
    id: generateId(),
    name: 'Electronics',
    description: 'Shop home entertainment, TVs, home audio, headphones, cameras, accessories and more.',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  }, {
    id: generateId(),
    name: 'Fashion',
    description: 'Shop Amazon Fashion including clothing, shoes, jewelry, watches, accessories and more.',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  }, {
    id: generateId(),
    name: 'Software',
    description: 'Shop for PC and Mac software including business, games, photography and more.',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  }, {
    id: generateId(),
    name: 'Beauty & Skin Care',
    description: 'Shop makeup, skin care, hair care, fragrances and more.',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  }, {
    id: generateId(),
    name: 'Sports & Outdoors',
    description: 'Shop fitness and exercise, outdoor recreation, team gear and more.',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  }, {
    id: generateId(),
    name: 'Home & Kitchen',
    description: 'Shop kitchen and dinning, bedding, bath, furniture, home décor and more.',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Departments', null, {})
};
