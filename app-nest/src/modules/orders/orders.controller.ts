import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles(RolesEnum.USER, RolesEnum.ADMIN)
  create(@Body() body: { userId: number; productIds: number[] }) {
    return this.ordersService.create(body.userId, body.productIds);
  }

  @Get()
  @Roles(RolesEnum.ADMIN)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @Roles(RolesEnum.ADMIN)
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(+id);
  }
}
