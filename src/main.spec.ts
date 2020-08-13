import { Checkout, pricingRules } from "./main";

describe("Expected Behaviours", () => {
  test("Scanning a product should populate a collection of those products.", () => {
    const checkout = new Checkout(pricingRules);
    checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 });
    checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 });
    expect(checkout.scannedSKUs.length).toBe(2);
  });

  test("Total should return a formatted final price string.", () => {
    const checkout = new Checkout(pricingRules);
    checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 });
    expect(checkout.total()).toBe("$549.99");
  });

  test("Total should return a formatted final price string.", () => {
    const checkout = new Checkout(pricingRules);
    checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 });
    expect(checkout.total()).toBe("$549.99");
  });
});

describe("Pricing Rules from Spec", () => {
  test("we're going to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will pay the price of 2 only", () => {
    const discount = pricingRules.threeForTwo.rule([
      { sku: "atv", name: "Apple TV", price: 109.5 },
      { sku: "atv", name: "Apple TV", price: 109.5 },
      { sku: "atv", name: "Apple TV", price: 109.5 }
    ]);
    expect(discount).toBe(109.5);
  });

  test("the brand new Super iPad will have a bulk discounted applied, where the price will drop to $499.99 each, if someone buys more than 4", () => {
    const discount = pricingRules.bulkDiscount.rule([
      { sku: "ipd", name: "Super iPad", price: 549.99 },
      { sku: "ipd", name: "Super iPad", price: 549.99 },
      { sku: "ipd", name: "Super iPad", price: 549.99 },
      { sku: "ipd", name: "Super iPad", price: 549.99 },
      { sku: "ipd", name: "Super iPad", price: 549.99 }
    ])
    expect(discount).toBe(5 * (549.99 - 499.99));
  });

  test("we will bundle in a free VGA adapter free of charge with every MacBook Pro sold", () => {
    const discount = pricingRules.adapterBundle.rule([
      { sku: "mbp", name: "MacBook Pro", price: 1399.99 },
    ])
    // Discount is the price of a VGA adapter.
    expect(discount).toBe(30.0);
  });
});


describe("Provided Example Scenarios", () => {
  test("When SKUs Scanned: atv, atv, atv, vga Total expected: $249.00", () => {
    const checkout = new Checkout(pricingRules);
    checkout.scan({ sku: "atv", name: "Apple TV", price: 109.5 });
    checkout.scan({ sku: "atv", name: "Apple TV", price: 109.5 });
    checkout.scan({ sku: "atv", name: "Apple TV", price: 109.5 });
    checkout.scan({ sku: "vga", name: "VGA adapter", price: 30.0 });
    expect(checkout.total()).toBe("$249.00");
  });

  test("SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd Total expected: $2718.95", () => {
    const checkout = new Checkout(pricingRules);
    checkout.scan({ sku: "atv", name: "Apple TV", price: 109.5 });
    checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 });
    checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 });
    checkout.scan({ sku: "atv", name: "Apple TV", price: 109.5 });
    checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 });
    checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 });
    checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 });
    expect(checkout.total()).toBe("$2718.95");
  });

  test("SKUs Scanned: mbp, vga, ipd Total expected: $1949.98", () => {
    const checkout = new Checkout(pricingRules);
    checkout.scan({ sku: "mbp", name: "MacBook Pro", price: 1399.99 });
    checkout.scan({ sku: "vga", name: "VGA adapter", price: 30.0 });
    checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 });
    expect(checkout.total()).toBe("$1949.98");
  });
});