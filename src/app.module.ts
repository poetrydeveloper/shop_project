import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { CrmModule } from './modules/crm/crm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrmService } from './crm.service';
import { CrmController } from './crm.controller';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('DB_PATH', 'data/db.sqlite'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,    // Микросервис аутентификации
    CatalogModule, // Микросервис каталога
    CrmModule,     // Микросервис CRM
  ],
  controllers: [AppController, CrmController, CatalogController, AuthController],
  providers: [AppService, CrmService, CatalogService, AuthService],
})
export class AppModule {}