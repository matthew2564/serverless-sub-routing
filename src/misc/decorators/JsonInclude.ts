export function JsonInclude() {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);

                for (const key in this) {
                    if (this.hasOwnProperty(key) && this[key] === undefined) {
                        // @ts-ignore
                        this[key] = null;
                    }
                }
            }
        };
    };
}
