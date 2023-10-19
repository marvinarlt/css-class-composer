export type ClassValues = string|string[];

export type Composer = (selection?: Selection) => string;

export type FlattendObject =  {
  [key: string|number|symbol]: string|number|boolean,
}

export type Options = {
  variants: Variant,
  compounds: Array<Selection & {
    class:  string,
  }>,
  default: Selection,
}

export type Variant = {
  [name: string]: string|string[]|Variant,
}

export type Selection = {
  [name: string]: string|boolean|Selection,
}


export class CssClassComposer {
  protected base: string[];
  protected options: Options;
  protected defaults: FlattendObject;
  protected variants: FlattendObject;
  protected compounds: FlattendObject[];

  public constructor(base: ClassValues, options: Options) {
    this.options = options;
    this.base = this.formatClassValues(base);
    this.defaults = this.flatten(options.default);
    this.variants = this.flatten(options.variants);
    this.compounds = options.compounds.map((compound) => this.flatten(compound));
  }

  public createComposer(): Composer {
    return (selection?: Selection): string => {  
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

  protected formatClassValues(values: ClassValues): string[] {
    return typeof values === 'string'
      ? values.split(' ')
      : values;
  }
}

export function cssClassComposer(base: ClassValues, options: Options) {
  return new CssClassComposer(base, options).createComposer();
}

export const ccc = cssClassComposer;
