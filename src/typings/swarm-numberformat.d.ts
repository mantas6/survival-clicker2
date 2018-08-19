/* tslint:disable:max-classes-per-file */

declare module 'swarm-numberformat' {
  interface FormatterOptions {
    /**
     * 'full' or 'short'. Flavors can modify any number of other options here.
     * Full is the default; short has fewer sigfigs and shorter standard-suffixes.
     */
    flavor?: 'full' | 'short';
    /**
     * Specify your own custom flavors.
     */
    flavors?: any;
    /**
     * 'native' or 'decimal.js'.
     */
    backend?: 'native' | 'decimal.js';
    suffixGroup?: string;
    suffixFn?: () => string;
    minSuffix?: number;
    /**
     * Special formatting for numbers with a decimal point
     */
    maxSmall?: number;
    sigfigs?: number;
    /**
     * 'standard', 'hybrid', 'scientific', 'longScale'.
     */
    format?: 'standard' | 'hybrid' | 'scientific' | 'longScale';
    /**
     * Specify your own custom formats.
     */
    formats?: any;
    /**
     * With the decimal.js backend, use this custom decimal.js constructor, like decimal.js-light or break_infinity.js.
     * By default, we'll try to import decimal.js.
     */
    Decimal?: any;
  }

  type Decimal = number | string | any;

  export class Formatter {
    constructor(opts?: FormatterOptions)

    /**
     * Format a number.
     */
    public format(val: Decimal, opts?: FormatterOptions): string;

    /**
     * Format a number with a specified flavor.
     * It's very common to call the formatter with different flavors, so it has its own shortcut.
     */
    public formatFlavor(val: Decimal, flavor: string, opts: FormatterOptions): string;

    public index(val: Decimal, opts: object): number;

    public listFormats(opts: FormatterOptions): string[];

    public suffix(val: Decimal, opts: FormatterOptions): string;
  }

  export class Parser {
    constructor(config: any)

    public parse(text: any, config: any): any;
  }

  export const format: (val: Decimal, opts?: FormatterOptions) => string;
  export const formatShort: (val: Decimal, opts?: FormatterOptions) => string;

  const numberformat: Formatter;

  export default numberformat;
}
