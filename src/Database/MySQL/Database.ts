import { Sequelize } from 'sequelize';
import "dotenv/config";

const poolConfig = {
    max: 20, 
    min: 2,
    idle: 20000,
    acquire: 40000
  };

const dialect: string = process.env.DB_DIALECT || 'mysql';

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASSWORD as string, {
    host: process.env.DB_HOST as string,
    dialect: dialect as any,
    pool: poolConfig
});
  
export default sequelize;