import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import '../config/dotenv.config';
import { Questioner, User } from './entities';
import { AccessToken } from './entities/accessToken.entity';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(`Connecting to the database...`);
    const options: TypeOrmModuleOptions = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Rai@2022',
      database: 'postgres',
      synchronize: true,
      entities: [User, Questioner, AccessToken],
      logging: true,
      migrations: ['dist/migrations/*.js'],
      migrationsTableName: 'migrations',
      extra: {
        connectionLimit: Number(
          this.configService.get<number>('DB_CONNECTION_LIMIT') ?? 50,
        ),
      },
    };
    console.log(`Database connected.`);
    return options;
  }
}

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: ['dist/typeorm/entities/*.entity.js'],
  logging: true,
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  extra: {
    connectionLimit: Number(Number(process.env.DB_CONNECTION_LIMIT ?? '50')),
  },
};
