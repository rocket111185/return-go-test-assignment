import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Platform } from './interfaces/platform.interface';

// Platform vendors
import { ShopifyPlatform } from './platforms/shopify';

const valueIsNotDefined = (value) =>
  value === null || typeof value === 'undefined';

@Injectable()
export class PlatformProvider {
  shopifyConfigs: {
    accessToken: string;
    baseUrl: string;
  };

  constructor(private readonly configService: ConfigService) {
    const shopifyAccessToken = this.configService.get<string>(
      'platform.shopify.accessToken',
    );

    const shopifyBaseUrl = this.configService.get<string>(
      'platform.shopify.baseUrl',
    );

    const credsToCheck = [shopifyAccessToken, shopifyBaseUrl];
    const anyCredIsNotDefined = credsToCheck.some((credential) =>
      valueIsNotDefined(credential),
    );

    if (anyCredIsNotDefined) {
      throw new Error('One of credentials was not defined correctly');
    }

    this.shopifyConfigs = {
      accessToken: shopifyAccessToken,
      baseUrl: shopifyBaseUrl,
    };
  }

  getPlatform(platformId): Platform {
    switch (platformId) {
      case 'shopify': {
        const { accessToken, baseUrl } = this.shopifyConfigs;
        return new ShopifyPlatform(accessToken, baseUrl);
      }

      default:
        throw new Error(`The platform "${platformId}" does not exist`);
    }
  }
}
