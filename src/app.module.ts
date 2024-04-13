import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product.module';
import { CategoryModule } from './modules/category.module';
import { AuthModule } from './modules/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransactionalInterceptor } from './shared/transactransactional.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './env/.dev.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        type: 'postgres', // type of our database
        host: process.env.DATABASE_HOST, // database host
        port: +process.env.DATABASE_PORT, // database host
        username: process.env.DATABASE_USERNAME, // username
        password: process.env.DATABASE_PASSWORD, // user password
        database: process.env.DATABASE_NAME, // name of our database,
        autoLoadEntities: true, // models will be loaded automatically
        synchronize: true, // your entities will be synced with the database(recommended in development)
      }),
    }),
    ProductModule,
    CategoryModule,
    AuthModule,
  ],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransactionalInterceptor,
    // },
  ],
})
export class AppModule {}
