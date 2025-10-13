import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';

/**
 * OrdersModule: Módulo que agrupa todo lo relacionado con las órdenes.
 * 
 * Este módulo incluye:
 *  - Entities: Order, User, Product
 *  - Controller: OrdersController para manejar rutas HTTP
 *  - Service: OrdersService para la lógica de negocio
 * 
 * Se encarga de inyectar dependencias necesarias y exponer funcionalidad relacionada con órdenes.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}