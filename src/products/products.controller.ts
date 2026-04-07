import { Controller, Get, Put, Post, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    create() {
        return this.productsService.create("Producto de ejemplo");
    }

    @Get()
    findAll() {
        return 'Listar todos los productos';
    }

    @Get(':id')
    findOne() {
        return 'Obtener un producto específico';
    }

    @Put(':id')
    update() {
        return 'Actualizar un producto específico';
    }

    @Delete(':id')
    remove() {
        return 'Eliminar un producto específico';
    }
}