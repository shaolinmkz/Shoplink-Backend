import express from 'express';
import { Departments } from '../controller';

const { getAllDeparments } = Departments;
const department = express.Router();

department.route('/departments')
  .get(getAllDeparments);

export default department;
