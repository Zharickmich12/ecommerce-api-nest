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

  /**
   * create: Método para crear un nuevo producto
   * @param data - { CreateProductDTO } Datos necesarios para crear el producto
   * @returns Product - Producto creado
   * @throws BadRequestException si ya existe un producto con el mismo nombre
   */
  async create(data: CreateProductDTO) {
    const exists = await this.productsRepo.findOne({ where: { name: data.name } });
    if (exists) throw new BadRequestException('Ya existe un producto con este nombre');

    const product = this.productsRepo.create(data);
    return this.productsRepo.save(product);
  }

  /**
   * findAll: Método para obtener todos los productos
   * @param status - { boolean } Opcional para filtrar productos activos/inactivos
   * @returns Product[] - Lista de productos
   */
  async findAll(status?: boolean) {
    const where = status !== undefined ? { status } : {};
    return this.productsRepo.find({ where });
  }

  /**
   * findOne: Método para obtener un producto por su ID
   * @param id - { number } ID del producto
   * @returns Product - Producto encontrado
   * @throws NotFoundException si el producto no existe
   */
  async findOne(id: number) {
    const product = await this.productsRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  /**
   * update: Método para actualizar un producto
   * @param id - { number } ID del producto a actualizar
   * @param changes - { UpdateProductDTO } Datos a actualizar
   * @returns Product - Producto actualizado
   * @throws NotFoundException si el producto no existe
   */
  async update(id: number, changes: UpdateProductDTO) {
    const product = await this.productsRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('Producto no encontrado');
    this.productsRepo.merge(product, changes);
    return this.productsRepo.save(product);
  }

  /**
   * updateStatus: Método para activar o desactivar un producto
   * @param id - { number } ID del producto
   * @param status - { boolean } Nuevo estado del producto
   * @returns Product - Producto actualizado
   * @throws NotFoundException si el producto no existe
   */
  async updateStatus(id: number, status: boolean) {
    const product = await this.productsRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('Producto no encontrado');
    product.status = status;
    return this.productsRepo.save(product);
  }

  /**
   * findByCategory: Método para obtener productos por categoría
   * @param category - { string } Categoría a filtrar
   * @returns Product[] - Lista de productos en la categoría especificada
   */
  async findByCategory(category: string) {
    return this.productsRepo.find({
      where: { category, status: true },
    });
  }

  /**
   * remove: Método para eliminar un producto
   * @param id - { number } ID del producto a eliminar
   * @returns Product - Producto eliminado
   * @throws NotFoundException si el producto no existe
   */
  async remove(id: number) {
    const product = await this.productsRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return this.productsRepo.remove(product);
  }
}