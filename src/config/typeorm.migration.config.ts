import { databaseConfig } from '../typeorm/typeorm.service';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource(databaseConfig);
