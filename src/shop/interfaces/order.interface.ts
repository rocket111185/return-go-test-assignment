export class PriceValue {
  amount: number;
  currency: string;
}

export class PriceDetails {
  shopPrice: PriceValue;
  presentmentPrice: PriceValue;
}

export class OrderItem {
  id: string;
  name: string;
  priceDetails: PriceDetails;
  productId: string;
  quantity: number; // if Shopify item quantity is > 1 then you should split it 1 by 1
  sku: string;
  varinatId: string;
  tax: PriceDetails;
}

// Main class
export class Order {
  id: string;
  name: string;
  priceDetails: PriceDetails;
  items: OrderItem[];
}
