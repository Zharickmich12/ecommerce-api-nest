import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { LoggerModule } from './common/middleware/logger/logger.module';
import { ProductsController } from './products/products.controller';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [ProductsModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
  consumer.apply(LoggerMiddleware).forRoutes(ProductsController);
  }
}
