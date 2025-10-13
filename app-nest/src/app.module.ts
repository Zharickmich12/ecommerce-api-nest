import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    /**
     * ConfigModule: Módulo para gestionar variables de entorno
     * isGlobal: true - permite acceder a las variables en cualquier módulo
     */
    ConfigModule.forRoot({ isGlobal: true }),

    /**
     * TypeOrmModule: Configuración de conexión a la base de datos
     * useFactory: función que obtiene las variables de entorno
     * autoLoadEntities: carga automáticamente las entidades definidas
     * synchronize: false para no modificar la estructura de la BD automáticamente
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),

    /**
     * Importación de los módulos de la aplicación:
     * UsersModule: Manejo de usuarios
     * AuthModule: Autenticación y autorización JWT
     * ProductsModule: Gestión de productos
     * OrdersModule: Gestión de órdenes
     */
    UsersModule, 
    AuthModule, 
    ProductsModule,
    OrdersModule
  ],

  /**
   * Controllers: Controladores principales de la aplicación
   */
  controllers: [AppController],

  /**
   * Providers: Servicios principales de la aplicación
   */
  providers: [AppService],
})
export class AppModule {}