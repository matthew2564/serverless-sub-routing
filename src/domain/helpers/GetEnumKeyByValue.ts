export const getEnumKeyByValue = <E extends Record<string, string>>(enumObj: E, value: string): keyof E | null =>
	Object.keys(enumObj).find((key) => enumObj[key]?.toLowerCase() === value?.toLowerCase()) as keyof E | null;
