type Product = {
  sku: string;
  name: string;
  price: number;
};

const products: Product[] = [
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

const pricingRules = {
  threeForTwo: { rule: () => {}, products: ["atv"] },
  bulkDiscount: { rule: () => {}, products: ["ipd"] },
  adapterBundle: { rule: () => {}, products: ["mbp"] },
}

class Checkout {
  pricingRules: object;
  scannedSKUs: string[];

  constructor(pricingRules: object) {
    this.pricingRules = pricingRules;
    this.scannedSKUs = [];
  }

  scan(product: Product) {
    this.scannedSKUs.push(product.sku);
  }

  total(): string {
    const discounts = Object.entries(this.pricingRules).map(([name, pricingRule]) => {
      const { rule, products } = pricingRule;
      const applicableProducts = this.scannedSKUs.filter( sku => products.includes(sku) )
      return rule(applicableProducts);
    });
    // console.log("discounts", discounts)
    return "hello world";
  }
}

const checkout = new Checkout(pricingRules);
checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 })
checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 })
checkout.scan({ sku: "mbp", name: "MacBook Pro", price: 1399.99 })
checkout.scan({ sku: "mbp", name: "MacBook Pro", price: 1399.99 })

checkout.scan({ sku: "atv", name: "Apple TV", price: 109.5 })
checkout.scan({ sku: "atv", name: "Apple TV", price: 109.5 })

checkout.scan({ sku: "vga", name: "VGA adapter", price: 30.0 })
checkout.scan({ sku: "vga", name: "VGA adapter", price: 30.0 })

console.log("total", checkout.total());
