export type Product = {
  sku: string;
  name: string;
  price: number;
};

export const products: Product[] = [
  { sku: "ipd", name: "Super iPad", price: 549.99 },
  { sku: "mbp", name: "MacBook Pro", price: 1399.99 },
  { sku: "atv", name: "Apple TV", price: 109.5 },
  { sku: "vga", name: "VGA adapter", price: 30.0 },
];

/**
 * we're going to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will pay the price of 2 only
 * the brand new Super iPad will have a bulk discounted applied, where the price will drop to $499.99 each, if someone buys more than 4
 * we will bundle in a free VGA adapter free of charge with every MacBook Pro sold
 */
export const pricingRules = {
  threeForTwo: {
    rule: (products: Product[]): number => {
      const productCount = products.length;
      const unitPrice = products[0].price;
      return Math.floor(productCount / 3) * unitPrice;
    },
    products: ["atv"],
  },
  bulkDiscount: { rule: (products: Product[]): number => {
    const productCount = products.length;
    const unitPrice = products[0].price;
    const discount = unitPrice - (unitPrice * 0.9090892561682939)
    return productCount > 4 ? productCount * discount : 0;
  }, products: ["ipd"] },
  adapterBundle: { rule: (products: Product[]): number => { 
    const productCount = products.length;
    return productCount * 30.0;
  }, products: ["mbp"] },
};

export class Checkout {
  pricingRules: object;
  scannedSKUs: Product[];

  constructor(pricingRules: object) {
    this.pricingRules = pricingRules;
    this.scannedSKUs = [];
  }

  scan(product: Product) {
    this.scannedSKUs.push(product);
  }

  total(): string {
    const discounts = Object.entries(this.pricingRules).map(
      ([name, pricingRule]) => {
        const { rule, products } = pricingRule;
        const applicableProducts = this.scannedSKUs.filter((sku) =>
          products.includes(sku.name)
        );
        return rule(applicableProducts);
      }
    );
    return "hello world";
  }
}
