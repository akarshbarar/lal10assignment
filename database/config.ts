import { Sequelize } from 'sequelize';

const db = process.env.DB || 'user';
const user = process.env.USER || 'admin';
const password = process.env.PASSWORD || 'password';
const host = process.env.HOST || 'localhost'
const sequelize = new Sequelize(db,  user, password, {
  host: host,
  dialect: 'mysql',
});

export default sequelize;
