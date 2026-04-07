import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    // DB local
    // array local
    private readonly products: any[] = [];

    create(product) {
        this.products.push(product);
        return 'Producto creado';
    }
    findAll() {
        return this.products;
    }  
}
