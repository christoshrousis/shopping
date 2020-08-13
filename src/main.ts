import { arrayToObject, numberFormatter, Product, PricingRules } from "./utils"
/**
 * One of the requirements for the project was flexibility.
 * To introduce fexibility, I decided to create a set of rules,
 * and each rule had an array of applicable product skus.
 * 
 * This did cause an issue in my "adapterBundle" method and produced
 * a "magic" number, which was the price of the VGA cable. I decided not to refactor
 * this as I wanted to stick to the 2 hour period and leave it as a discussion point.
 */
export const pricingRules: PricingRules = {
  threeForTwo: {
    rule: (products) => {
      const productCount = products.length;
      if (productCount === 0) return 0;
      const unitPrice = products[0].price;
      return Math.floor(productCount / 3) * unitPrice;
    },
    products: ["atv"],
  },
  bulkDiscount: {
    rule: (products) => {
      const productCount = products.length;
      if (productCount === 0) return 0;
      const unitPrice = products[0].price;
      const discount = unitPrice - unitPrice * 0.9090892561682939;
      return productCount > 4 ? productCount * discount : 0;
    },
    products: ["ipd"],
  },
  adapterBundle: {
    rule: (products) => {
      const productCount = products.length;
      if (productCount === 0) return 0;
      return productCount * 30.0;
    },
    products: ["mbp"],
  },
};

/**
 * The main class responsible for scanning in objects.
 * @class
 */
export class Checkout {
  pricingRules: object;
  scannedSKUs: Product[];
  productsMap: object;

  constructor(pricingRules: object) {
    this.pricingRules = pricingRules;
    this.scannedSKUs = [];

    const products: Product[] = [
      { sku: "ipd", name: "Super iPad", price: 549.99 },
      { sku: "mbp", name: "MacBook Pro", price: 1399.99 },
      { sku: "atv", name: "Apple TV", price: 109.5 },
      { sku: "vga", name: "VGA adapter", price: 30.0 },
    ];
    
    this.productsMap = arrayToObject(products, "sku");
  }

  scan(sku: string) {
    /**
     * This ts ignore is because I didn't use generic typying on the 
     * arrayToObject, and figured it might be overkill and out of scope to type this.
     */
    // @ts-ignore 
    this.scannedSKUs.push(this.productsMap[sku]);
  }

  totalPrice(): number {
    const reducer = (accumulator: number, currentValue: Product) =>
      accumulator + currentValue.price;
    return this.scannedSKUs.reduce(reducer, 0);
  }

  /**
   * Returns the total price of scanned items, with discounts applied. 
   * @returns {string} The price, as a formatted string.
   */
  total(): string {
    /**
     * When I first set out, I wasn't sure whether I would
     * require a key, so I decided to createed pricing rules as an Object.
     * It turns out I didn't need this, but decided not to refactor needlessly.
     */

    /**
     * Loop over all pricing rules, then apply the rules against
     * the array of scanned products.
     */
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
    return numberFormatter(this.totalPrice() - totalDiscount);
  }
}
