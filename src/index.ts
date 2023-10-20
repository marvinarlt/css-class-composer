export type FlattendObject =  {
  [key: keyof any]: string | number | boolean,
}

export type Composer<T extends Variant> = (selection?: Selection<T>) => string;

export type ClassValue = string | string[];

export type VariantKey = string;

export type VariantValue = string | string[] | Variant;

export type Variant<K extends VariantKey = string, V extends VariantValue = string> = {
  [P in K]: V | Variant;
}

export type VariantSelection<K extends string, V extends VariantValue> = V extends Variant
  ? {
      [P in K]?: V[P] extends Variant
        ? NextSelection<P, V> | keyof V[P]
        : boolean
    }
  : never;

export type NextSelection<K extends VariantKey, V extends Variant> = keyof V[K] extends VariantKey
  ? VariantSelection<keyof V[K], V[K]>
  : never;

export type Selection<T extends Variant> = keyof T extends string
  ? VariantSelection<keyof T, T>
  : never;

export type VariantCompound<T extends Variant> = Selection<T> & {
  class: ClassValue,
}

export type Options<T extends Variant> = {
  variants: T,
  default: Selection<T>,
  compounds?: VariantCompound<T>[],
}

export class CssClassComposer<T extends Variant> {
  protected base: string[];
  protected options: Options<T>;
  protected defaults: FlattendObject;
  protected variants: FlattendObject;
  protected compounds: FlattendObject[];

  public constructor(base: ClassValue, options: Options<T>) {
    this.options = options;
    this.base = this.formatClassValues(base);
    this.defaults = this.flatten(options.default);
    this.variants = this.flatten(options.variants);
    
    this.compounds = typeof options.compounds !== 'undefined'
      ? options.compounds.map((compound) => this.flatten(compound))
      : [];
  }

  public createComposer(): Composer<T> {
    return (selection) => {
      if (typeof selection === 'undefined') {
        return this.compose(this.defaults);
      }
  
      const flattendSelection = this.flatten(selection);
      const mergedSelection = Object.assign({}, this.defaults, flattendSelection);
  
      return this.compose(mergedSelection);
    }
  }

  protected compose(selection: FlattendObject): string {
    const classes = Array.from(this.base);
    const compounds = this.filterCompounds(selection);

    for (const compound of compounds) {
      if ('class' in compound) {
        classes.push(...this.formatClassValues(compound.class as string))
      }
    }

    for (const [selectionKey, selectionValue] of Object.entries(selection)) {
      const key = this.formatIdentifier(selectionKey, selectionValue);
  
      if (key in this.variants && selectionValue !== false) {
        classes.push(this.variants[key].toString());
      }
    }
  
    return this.toClassString(classes);
  }

  protected filterCompounds(selection: FlattendObject): FlattendObject[] {
    const selectionIdentifiers = this.filterIdentifier(selection);
    const compounds: FlattendObject[] = [];

    for (const compound of this.compounds) {
      const compoundIdentifiers = this.filterIdentifier(compound);
      const includeCompound = compoundIdentifiers.every((identifier) => {
        return selectionIdentifiers.includes(identifier);
      });

      if (includeCompound) {
        compounds.push(compound);
      }
    }

    return compounds;
  }

  protected filterIdentifier(source: FlattendObject): string[] {
    const identifiers: string[] = [];

    for (const [key, value] of Object.entries(source)) {
      if (key !== 'class' && value !== false) {
        identifiers.push(this.formatIdentifier(key, value));
      }
    }

    return identifiers;
  }

  protected formatIdentifier(key: string, value: string|number|boolean): string {
    return typeof value !== 'boolean'
      ? `${key}.${value}`
      : key;
  }
  
  protected flatten<T extends Object>(source: T, prefix: string = '', target: FlattendObject = {}): FlattendObject {
    if (typeof source !== 'object') {
      return target;
    }
  
    const entries = Array.isArray(source)
      ? source.entries()
      : Object.entries(source);
  
    for (const [key, value] of entries) {
      const newKey = prefix.length > 0
        ? `${prefix}.${key}`
        : key.toString();
  
      if (typeof value !== 'object') {
        target[newKey] = value;
        continue;
      }
  
      this.flatten(value, newKey, target);
    }
    
    return target;
  }

  protected toClassString(classes: string[]): string {
    return classes
      .map((c) => c.trim())
      .join(' ');
  }

  protected formatClassValues(values: ClassValue): string[] {
    return typeof values === 'string'
      ? values.split(' ')
      : values;
  }
}

export function cssClassComposer<T extends Variant>(base: ClassValue, options: Options<T>) {
  return new CssClassComposer(base, options).createComposer();
}

export const ccc = cssClassComposer;
