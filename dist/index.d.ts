export type ClassValues = string | string[];
export type Composer = (selection?: Selection) => string;
export type FlattendObject = {
    [key: string | number | symbol]: string | number | boolean;
};
export type Options = {
    variants: Variant;
    compounds: Array<Selection & {
        class: string;
    }>;
    default: Selection;
};
export type Variant = {
    [name: string]: string | string[] | Variant;
};
export type Selection = {
    [name: string]: string | boolean | Selection;
};
export declare class CssClassComposer {
    protected base: string[];
    protected options: Options;
    protected defaults: FlattendObject;
    protected variants: FlattendObject;
    protected compounds: FlattendObject[];
    constructor(base: ClassValues, options: Options);
    createComposer(): Composer;
    protected compose(selection: FlattendObject): string;
    protected filterCompounds(selection: FlattendObject): FlattendObject[];
    protected filterIdentifier(source: FlattendObject): string[];
    protected formatIdentifier(key: string, value: string | number | boolean): string;
    protected flatten<T extends Object>(source: T, prefix?: string, target?: FlattendObject): FlattendObject;
    protected toClassString(classes: string[]): string;
    protected formatClassValues(values: ClassValues): string[];
}
export declare function cssClassComposer(base: ClassValues, options: Options): Composer;
export declare const ccc: typeof cssClassComposer;
