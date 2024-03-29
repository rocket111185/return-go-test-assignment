import { Controller, Post, Body, Param } from '@nestjs/common';
import { PlatformProvider } from './platform-provider.service';
import { Product } from './interfaces/product.interface';

@Controller()
export class ProductController {
  constructor(private readonly platformProvider: PlatformProvider) {}

  @Post('/product/:platform')
  async createProduct(@Body() productBody: Product, @Param() params: any) {
    // TODO: perform productBody validation
    const platformId = params.platform;

    const provider = this.platformProvider.getPlatform(platformId);
    const result = await provider.createProduct(productBody);

    return result;
  }
}
