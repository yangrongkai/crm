/** Global definitions for development **/

// for style loader
declare module '*.css' {
    const content: { [key: string]: any }
    export = content;
}

declare module '*.less' {
    const content: { [key: string]: any }
    export = content;
}

declare module '*.js' {
    const content: { [key: string]: any };
    export = content;
}

// Omit type https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-377567046
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;
