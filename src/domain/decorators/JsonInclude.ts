/* eslint-disable */
// Ignored due to TS - TS2545: A mixin class must have a constructor with a single rest parameter of type 'any[]'.
// So `any` is the valid type in this instance

/**
 * Decorator to include null values in JSON serialization
 */
export function JsonInclude() {
	return <T extends { new (...args: any[]): object }>(constructor: T) => {
		return class extends constructor {
			constructor(...args: any[]) {
				super(...args);

				for (const key in this) {
					if (this.hasOwnProperty(key) && this[key] === undefined) {
						// @ts-expect-error
						this[key] = null;
					}
				}
			}
		};
	};
}
