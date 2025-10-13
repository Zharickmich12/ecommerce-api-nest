import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Product) private productsRepo: Repository<Product>,
  ) {}

  /**
   * create: Método para crear una nueva orden.
   * @param userId - {number} - ID del usuario que realiza la orden
   * @param productIds - {number[]} - Array con los IDs de los productos a incluir
   * @returns {Order} - Retorna la orden creada con los productos y total calculado
   * @throws NotFoundException si el usuario no existe o los productos no son válidos
   */
  async create(userId: number, productIds: number[]) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const products = await this.productsRepo.find({ where: { id: In(productIds), status: true } });
    if (products.length === 0) throw new NotFoundException('Productos no válidos');

    const total = products.reduce((sum, p) => sum + Number(p.price), 0);

    const order = this.ordersRepo.create({ user, products, total });
    return this.ordersRepo.save(order);
  }

  /**
   * findAll: Método para obtener todas las órdenes registradas.
   * @returns {Order[]} - Retorna un array con todas las órdenes, incluyendo usuario y productos
   */
  findAll() {
    return this.ordersRepo.find({ relations: ['user', 'products'] });
  }

  /**
   * findOne: Método para obtener una orden específica por su ID.
   * @param id - {number} - ID de la orden a consultar
   * @returns {Order} - Retorna la orden correspondiente incluyendo usuario y productos
   */
  findOne(id: number) {
    return this.ordersRepo.findOne({ where: { id }, relations: ['user', 'products'] });
  }
}