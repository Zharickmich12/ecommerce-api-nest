import { Body, Controller, Get, Param, Patch, Post, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dto/products/create-product.dto';
import { UpdateProductDTO } from 'src/dto/products/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * create: Método para crear un nuevo producto.
   * @param dto - {CreateProductDTO} - Datos necesarios para crear el producto
   * @returns {Product} - Retorna el producto creado
   * Requiere rol: ADMIN
   */
  @Post()
  @Roles(RolesEnum.ADMIN)
  create(@Body() dto: CreateProductDTO) {
    return this.productsService.create(dto);
  }

  /**
   * findAll: Método para obtener todos los productos.
   * @param status - {boolean} (opcional) - Filtra por estado activo/inactivo
   * @returns {Product[]} - Retorna un array con los productos
   * Requiere rol: ADMIN o USER
   */
  @Get()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  findAll(@Query('status') status?: boolean) {
    return this.productsService.findAll(status);
  }

  /**
   * findOne: Método para obtener un producto específico por su ID.
   * @param id - {number} - ID del producto
   * @returns {Product} - Retorna el producto correspondiente
   * Requiere rol: ADMIN o USER
   */
  @Get(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  /**
   * findByCategory: Método para obtener productos por categoría.
   * @param category - {string} - Nombre de la categoría
   * @returns {Product[]} - Retorna productos que pertenecen a la categoría
   * Requiere rol: ADMIN o USER
   */
  @Get('category/:category')
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  findByCategory(@Param('category') category: string) {
    return this.productsService.findByCategory(category);
  }

  /**
   * update: Método para actualizar los datos de un producto.
   * @param id - {number} - ID del producto a actualizar
   * @param dto - {UpdateProductDTO} - Datos nuevos del producto
   * @returns {Product} - Retorna el producto actualizado
   * Requiere rol: ADMIN
   */
  @Patch(':id')
  @Roles(RolesEnum.ADMIN)
  update(@Param('id') id: number, @Body() dto: UpdateProductDTO) {
    return this.productsService.update(+id, dto);
  }

  /**
   * updateStatus: Método para activar o desactivar un producto.
   * @param id - {number} - ID del producto
   * @param status - {boolean} - Nuevo estado del producto
   * @returns {Product} - Retorna el producto con el estado actualizado
   * Requiere rol: ADMIN
   */
  @Patch(':id/status')
  @Roles(RolesEnum.ADMIN)
  updateStatus(@Param('id') id: number, @Body('status') status: boolean) {
    return this.productsService.updateStatus(+id, status);
  }

  /**
   * remove: Método para eliminar un producto.
   * @param id - {number} - ID del producto a eliminar
   * @returns {Product} - Retorna el producto eliminado
   * Requiere rol: ADMIN
   */
  @Delete(':id')
  @Roles(RolesEnum.ADMIN)
  remove(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }
}