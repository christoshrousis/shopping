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

export const pricingRules = {
  threeForTwo: {
    rule: (products: Product[]): number => {
      const productCount = products.length;
      if (productCount === 0) return 0;
      const unitPrice = products[0].price;
      return Math.floor(productCount / 3) * unitPrice;
    },
    products: ["atv"],
  },
  bulkDiscount: {
    rule: (products: Product[]): number => {
      const productCount = products.length;
      if (productCount === 0) return 0;
      const unitPrice = products[0].price;
      const discount = unitPrice - unitPrice * 0.9090892561682939;
      return productCount > 4 ? productCount * discount : 0;
    },
    products: ["ipd"],
  },
  adapterBundle: {
    rule: (products: Product[]): number => {
      const productCount = products.length;
      if (productCount === 0) return 0;
      return productCount * 30.0;
    },
    products: ["mbp"],
  },
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

  totalPrice(): number {
    const reducer = (accumulator: number, currentValue: Product) =>
      accumulator + currentValue.price;
    return this.scannedSKUs.reduce(reducer, 0);
  }

  total() {
    const discounts = Object.entries(this.pricingRules).map(
      ([name, pricingRule]) => {
        const { rule, products } = pricingRule;
        const applicableProducts = this.scannedSKUs.filter((sku) =>
          products.includes(sku.sku)
        );
        return rule(applicableProducts);
      }
    );
    const totalDiscount = discounts.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    return this.totalPrice() - totalDiscount;
  }
}
