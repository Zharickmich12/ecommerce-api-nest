import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';

/**
 * OrdersController: Controlador que maneja las rutas relacionadas con las órdenes.
 * 
 * Protege las rutas mediante JWT (JwtAuthGuard) y control de roles (RolesGuard).
 * Dependiendo del rol del usuario, puede permitir o denegar el acceso a ciertas rutas.
 */
@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * create: Crea una nueva orden.
   * 
   * @param body - Objeto que contiene:
   *               userId: ID del usuario que realiza la orden
   *               productIds: Array con los IDs de los productos a incluir en la orden
   * @returns Objeto con la información de la orden creada
   * @roles Permite el acceso a usuarios con rol USER o ADMIN
   */
  @Post()
  @Roles(RolesEnum.USER, RolesEnum.ADMIN)
  create(@Body() body: { userId: number; productIds: number[] }) {
    return this.ordersService.create(body.userId, body.productIds);
  }

  /**
   * findAll: Obtiene todas las órdenes registradas en el sistema.
   * 
   * @returns Array con todas las órdenes
   * @roles Solo accesible para usuarios con rol ADMIN
   */
  @Get()
  @Roles(RolesEnum.ADMIN)
  findAll() {
    return this.ordersService.findAll();
  }

  /**
   * findOne: Obtiene una orden específica por su ID.
   * 
   * @param id - ID de la orden a buscar
   * @returns Objeto con la información de la orden encontrada
   * @roles Solo accesible para usuarios con rol ADMIN
   */
  @Get(':id')
  @Roles(RolesEnum.ADMIN)
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(+id);
  }
}