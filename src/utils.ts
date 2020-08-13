var formatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});


export const arrayToObject = (array: Product[], keyField: string): object =>
  array.reduce((obj, item) => {
    // As mentioned in the index file, I am missing some typing here.
    // @ts-ignore 
    obj[item[keyField]] = item;
    return obj;
  }, {});

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
