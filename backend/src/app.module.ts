import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Changed from 'mysql' to 'postgres'
      host: 'localhost',
      port: 5432, // Default PostgreSQL port
      username: 'postgres', // Your PostgreSQL username
      password: 'root', // Your PostgreSQL password
      database: 'test', // Ensure this database exists in your PostgreSQL
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}