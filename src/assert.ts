const isArray = Array.isArray;
const keyList = Object.keys;
const hasProp = Object.prototype.hasOwnProperty;

export const equal = (a: any, b: any): boolean => {
    if (a === b) {
        return true;
    }

    if (a && b && typeof a === 'object' && typeof b === 'object') {
        const arrA = isArray(a);
        const arrB = isArray(b);
        let length: number;

        if (arrA && arrB) {
            length = a.length;
            if (length !== b.length) {
                return false;
            }
            for (let i = length; i-- !== 0;) {
                if (!equal(a[i], b[i])) {
                    return false;
                }
            }
            return true;
        }

        if (arrA !== arrB) {
            return false;
        }

        const dateA = a instanceof Date;
        const dateB = b instanceof Date;
        if (dateA !== dateB) {
            return false;
        }
        if (dateA && dateB) {
            return a.getTime() === b.getTime();
        }

        const regexpA = a instanceof RegExp;
        const regexpB = b instanceof RegExp;
        if (regexpA !== regexpB) {
            return false;
        }
        if (regexpA && regexpB) {
            return a.toString() === b.toString();
        }

        const keys = keyList(a);
        length = keys.length;

        if (length !== keyList(b).length) {
            return false;
        }

        for (let i = length; i-- !== 0;) {
            if (!hasProp.call(b, keys[i])) {
                return false;
            }
        }

        for (let i = length; i-- !== 0;) {
            const key = keys[i];
            if (!equal(a[key], b[key])) {
                return false;
            }
        }

        return true;
    }

    return a !== a && b !== b;
};