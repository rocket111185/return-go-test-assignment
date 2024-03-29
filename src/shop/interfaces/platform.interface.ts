import { Order } from './order.interface';
import { Product } from './product.interface';

export abstract class Platform {
  abstract getOrderById(id: string): Promise<Order>;

  abstract getOrders(): Promise<Order[]>;

  abstract createProduct(productBody: Product): Promise<any>;
}
