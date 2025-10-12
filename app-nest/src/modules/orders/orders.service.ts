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

  async create(userId: number, productIds: number[]) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const products = await this.productsRepo.find({ where: { id: In(productIds), status: true } });
    if (products.length === 0) throw new NotFoundException('Productos no válidos');

    const total = products.reduce((sum, p) => sum + Number(p.price), 0);

    const order = this.ordersRepo.create({ user, products, total });
    return this.ordersRepo.save(order);
  }

  findAll() {
    return this.ordersRepo.find({ relations: ['user', 'products'] });
  }

  findOne(id: number) {
    return this.ordersRepo.findOne({ where: { id }, relations: ['user', 'products'] });
  }
}
