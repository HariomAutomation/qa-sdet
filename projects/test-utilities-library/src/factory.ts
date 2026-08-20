export type FieldGenerator<T> = {
  [K in keyof T]: () => T[K];
};

export interface Factory<T> {
  build(overrides?: Partial<T>): T;
  buildMany(count: number, overrides?: Partial<T>): T[];
}

/**
 * Creates a type-safe mock data factory.
 *
 * @template T
 * @param {FieldGenerator<T>} generator Map of default generators
 * @returns {Factory<T>}
 */
export function createDataFactory<T extends Record<string, any>>(
  generator: FieldGenerator<T>
): Factory<T> {
  return {
    build(overrides: Partial<T> = {}): T {
      const entity: any = {};

      for (const key in generator) {
        if (Object.prototype.hasOwnProperty.call(generator, key)) {
          entity[key] = key in overrides ? overrides[key] : generator[key]();
        }
      }

      return entity as T;
    },

    buildMany(count: number, overrides: Partial<T> = {}): T[] {
      return Array.from({ length: count }, () => this.build(overrides));
    },
  };
}
