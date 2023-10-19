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
