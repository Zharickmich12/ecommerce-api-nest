import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}

/**
 * ProductsModule: Módulo que agrupa todo lo relacionado con los productos.
 * - imports: Importa el repositorio de Product para usar TypeORM.
 * - controllers: Contiene el ProductsController que expone las rutas HTTP.
 * - providers: Contiene ProductsService que implementa la lógica de negocio.
 * - exports: Exporta ProductsService para que otros módulos puedan usarlo.
 */