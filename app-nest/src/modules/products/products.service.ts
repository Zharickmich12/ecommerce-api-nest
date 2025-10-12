import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { CreateProductDTO } from 'src/dto/products/create-product.dto';
import { UpdateProductDTO } from 'src/dto/products/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
  ) {}

  async create(data: CreateProductDTO) {
    const exists = await this.productsRepo.findOne({ where: { name: data.name } });
    if (exists) throw new BadRequestException('Ya existe un producto con este nombre');

    const product = this.productsRepo.create(data);
    return this.productsRepo.save(product);
  }

  async findAll(status?: boolean) {
    const where = status !== undefined ? { status } : {};
    return this.productsRepo.find({ where });
  }

  async findOne(id: number) {
    const product = await this.productsRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async update(id: number, changes: UpdateProductDTO) {
    const product = await this.productsRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('Producto no encontrado');
    this.productsRepo.merge(product, changes);
    return this.productsRepo.save(product);
  }

  async updateStatus(id: number, status: boolean) {
    const product = await this.productsRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('Producto no encontrado');
    product.status = status;
    return this.productsRepo.save(product);
  }

  async findByCategory(category: string) {
    return this.productsRepo.find({
      where: { category, status: true },
    });
  }

  async remove(id: number) {
    const product = await this.productsRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return this.productsRepo.remove(product);
  }
}