import { Checkout, pricingRules } from "./main";

describe("Example Scenarios", () => {
  test("When SKUs Scanned: atv, atv, atv, vga Total expected: $249.00", () => {
    expect(false === false).toBe(false);
  });
  test("SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd Total expected: $2718.95", () => {
    expect(false === false).toBe(false);
  });
  test("SKUs Scanned: mbp, vga, ipd Total expected: $1949.98", () => {
    expect(false === false).toBe(false);
  });
});

describe("Expected Behaviours", () => {
  test("Scanning a product should populate a collection of those products.", () => {
    const checkout = new Checkout(pricingRules);
    checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 });
    checkout.scan({ sku: "ipd", name: "Super iPad", price: 549.99 });
    expect(checkout.scannedSKUs.length).toBe(2);
  });
});
