import { Body, Controller, Get, Param, Patch, Post, Delete, Query, UseGuards} from '@nestjs/common';
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

  @Post()
  @Roles(RolesEnum.ADMIN)
  create(@Body() dto: CreateProductDTO) {
    return this.productsService.create(dto);
  }

  @Get()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  findAll(@Query('status') status?: boolean) {
    return this.productsService.findAll(status);
  }

  @Get(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Get('category/:category')
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  findByCategory(@Param('category') category: string) {
    return this.productsService.findByCategory(category);
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN)
  update(@Param('id') id: number, @Body() dto: UpdateProductDTO) {
    return this.productsService.update(+id, dto);
  }

  @Patch(':id/status')
  @Roles(RolesEnum.ADMIN)
  updateStatus(@Param('id') id: number, @Body('status') status: boolean) {
    return this.productsService.updateStatus(+id, status);
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN)
  remove(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }
}
