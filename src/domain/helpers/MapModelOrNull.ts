import {ClassConstructor, plainToInstance} from "class-transformer";

const isEmpty = (val: object) => Object.values(val).every((x) => !x);

export const plainToInstanceOrNull = <T>(classObject: ClassConstructor<T>, data: unknown): T | null => {
	const result = plainToInstance(classObject, data) as object;
	return isEmpty(result) ? null : (result as T);
};
