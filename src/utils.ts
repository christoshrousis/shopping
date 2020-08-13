/**
 * Takes an array, and returns a map.
 * @param array The products array, unkeyed.
 * @param keyField The field to use as the id.
 * @returns Mapped object, based off the keyField.
 */
export const arrayToObject = (array: Product[], keyField: string): object =>
  array.reduce((obj, item) => {
    // As mentioned in the index file, I am missing some typing here.
    // @ts-ignore 
    obj[item[keyField]] = item;
    return obj;
  }, {});

const formatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});
/**
 * Takes a number, a returns a formatted string.
 * 
 * @param number Unformatted number, integer or decimal.
 * @returns The number as a formatted string as per the supplied spec.
 */
export const numberFormatter = (number: number) =>
  formatter.format(number).replace(/,/g, "");

export type Product = {
  sku: string;
  name: string;
  price: number;
};

export type PricingRule = {
  rule: (products: Product[]) => number;
  products: string[];
};

export type PricingRules = { [key: string]: PricingRule };
