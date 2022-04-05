import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configValidationSchema } from './config.schema';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: config.get('TYPEORM_CONNECTION') as 'postgres',
          host: config.get<string>('TYPEORM_HOST'),
          username: config.get<string>('TYPEORM_USERNAME'),
          password: config.get<string>('TYPEORM_PASSWORD'),
          database: config.get<string>('TYPEORM_DATABASE'),
          entities: ['dist/**/*.entity.{ts,js}'],
          port: config.get<number>('TYPEORM_PORT'),
          synchronize: true,
        };
      },
    }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
