import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ProductController } from './product.controller';
import { PlatformProvider } from './platform-provider.service';

@Module({
  controllers: [OrderController, ProductController],
  providers: [PlatformProvider],
})
export class ShopModule {}
