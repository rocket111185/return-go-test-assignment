import { Controller, Get, Param } from '@nestjs/common';
import { PlatformProvider } from './platform-provider.service';
import { Order } from './interfaces/order.interface';

@Controller()
export class OrderController {
  constructor(private readonly platformProvider: PlatformProvider) {}

  @Get('orders/:platform')
  async getOrders(@Param() params: any): Promise<Order[]> {
    const platformId = params.platform;

    const provider = this.platformProvider.getPlatform(platformId);
    const result = await provider.getOrders();

    return result;
  }

  @Get('order/:platform/:id')
  async getOrderById(@Param() params: any): Promise<Order> {
    const platformId = params.platform;
    const orderId = params.id;

    const provider = this.platformProvider.getPlatform(platformId);
    const result = await provider.getOrderById(orderId);

    return result;
  }
}
