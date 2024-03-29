import { Order } from '../interfaces/order.interface';
import { Platform } from '../interfaces/platform.interface';
import { Product } from '../interfaces/product.interface';
import axios, { AxiosInstance } from 'axios';

export class ShopifyPlatform extends Platform {
  httpModule: AxiosInstance;

  constructor(accessToken: string, baseUrl: string) {
    super();

    const httpModule = axios.create({
      baseURL: baseUrl,
    });

    httpModule.defaults.headers.common['X-Shopify-Access-Token'] = accessToken;
    httpModule.defaults.headers.common['Content-Type'] = 'application/json';

    this.httpModule = httpModule;
  }

  async getOrderById(id: string): Promise<Order> {
    const response = await this.httpModule.get(
      `/orders/${id}.json?fields=id,line_items,name,total_price_set`,
    );

    // TODO: perform object field mapping
    return response.data;
  }

  async getOrders(): Promise<Order[]> {
    const response = await this.httpModule.get(
      '/orders.json?fields=id,line_items,name,total_price_set',
    );

    // TODO: perform object field mapping
    return response.data;
  }

  async createProduct(productBody: Product): Promise<any> {
    const requestBody = {
      product: {
        title: productBody.title,
        body_html: `<p>${productBody.description}</p>`,
        vendor: productBody.vendor,
        product_type: productBody.type,
        status: 'draft',
      },
    };

    const response = await this.httpModule.post('/products.json', requestBody);

    // TODO: perform object field mapping
    return response.data;
  }
}
