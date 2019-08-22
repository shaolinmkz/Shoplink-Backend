import dotenv from 'dotenv';
import { v4 as generateId } from 'uuid';
import { Helpers } from '../../utils';

dotenv.config();

const {
  ADMIN_ONE_PASSWORD,
  ADMIN_TWO_PASSWORD,
  DEFAULT_PROFILE_IMAGE,
  ADMIN_ONE_EMAIL,
  ADMIN_TWO_EMAIL
} = process.env;

export default {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', await [{
    id: generateId(),
    firstName: 'Chukwuemeka',
    lastName: 'Nwabuzor',
    email: ADMIN_ONE_EMAIL,
    password: Helpers.hashPassword(ADMIN_ONE_PASSWORD),
    address1: 'No. 24 Amadu bello way Lagos ',
    address2: 'No. 15 Garki Abuja',
    state: 'Lagos',
    lga: 'Apapa',
    postalCode: '1673',
    shippingRegion: 'Nigeria, Lagos',
    creditCard: '1234567890',
    phone1: '07063526735',
    phone2: '09076356385',
    profileImage: DEFAULT_PROFILE_IMAGE,
    isAdmin: true,
    role: 'super-admin',
    uniqueToken: 'n/a',
    isEmailVerified: true,
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  },
  {
    id: generateId(),
    firstName: 'Michael',
    lastName: 'Obasi',
    email: ADMIN_TWO_EMAIL,
    password: Helpers.hashPassword(ADMIN_TWO_PASSWORD),
    address1: 'Block 2 Musa road Lagos',
    address2: 'No. 5 Wuse Abuja',
    state: 'Abuja',
    lga: 'Somolu',
    postalCode: '1325',
    shippingRegion: 'Nigeria, Abuja',
    creditCard: '0987654321',
    phone1: '07063547484',
    phone2: '09039375025',
    profileImage: DEFAULT_PROFILE_IMAGE,
    isAdmin: true,
    role: 'super-admin',
    uniqueToken: 'n/a',
    isEmailVerified: true,
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};
