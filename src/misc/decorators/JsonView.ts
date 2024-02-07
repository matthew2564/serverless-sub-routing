/* eslint-disable */

import 'reflect-metadata';

// Define a symbol to store metadata keys
const JsonViewMetadataKey = Symbol('JsonView');

// JsonView decorator factory
export function JsonView(viewName: string | string[]) {
	return function (target: object, propertyKey: string) {
		// Get existing metadata for the target, or initialize an empty object
		const existingMetadata = Reflect.getMetadata(JsonViewMetadataKey, target) || {};

		console.log(existingMetadata);
		// Add or update the view for the property
		existingMetadata[propertyKey] = viewName;
		// Update the metadata for the target
		Reflect.defineMetadata(JsonViewMetadataKey, existingMetadata, target);
	};
}

// Custom serialization function
export function serializeInstanceWithView<T>(target: T, views: string | string[]): string {
	const metadata = Reflect.getMetadata(JsonViewMetadataKey, target as object) || {};
	const viewObject: Record<string, string> = {};

	for (const [key, viewNames] of Object.entries(metadata)) {
		if (typeof viewNames === 'string' && viewNames === views) {
			viewObject[key] = (target as Record<string, string>)[key];
		} else if (Array.isArray(views) && views.some((view) => (viewNames as string).includes(view))) {
			viewObject[key] = (target as Record<string, string>)[key];
		}
	}

	return JSON.stringify(viewObject);
}

function serializeClassWithViews<T extends { [key: string]: any }>(
	ctor: { new (...args: any[]): T },
	instance: T,
	views: string | string[]
): string {
	const metadata = Reflect.getMetadata(JsonViewMetadataKey, ctor.prototype) || {};
	const viewObject: Record<string, string> = {};

	for (const [key, viewNames] of Object.entries(metadata)) {
		if (typeof viewNames === 'string' && viewNames === views) {
			viewObject[key] = (instance as Record<string, any>)[key];
		} else if (Array.isArray(views) && views.some((view) => (viewNames as string).includes(view))) {
			viewObject[key] = instance[key];
		}
	}

	return JSON.stringify(viewObject);
}

class Test {
	points!: number;
}

// Example usage
class User {
	@JsonView('url-123')
	id: number;

	@JsonView(['basic', 'detailed'])
	name: string;

	@JsonView(['detailed'])
	email: string;

	@JsonView(['random', 'detailed'])
	age: number;

	@JsonView(['new'])
	test: Test;

	constructor(id: number, name: string, email: string, age: number, test: Test) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.age = age;
		this.test = test;
	}
}

// Example instance
const user = new User(1, 'John Doe', 'john.doe@example.com', 26, { points: 12 });

// roles from token
const roles = ['basic', 'detailed'];

// Serialize with "basic" view
console.log(serializeInstanceWithView(user, ['basic']));

// Serialize with "detailed" view
console.log(serializeInstanceWithView(user, roles));

console.log(serializeInstanceWithView(user, []));

console.log(
	serializeClassWithViews(
		User,
		{
			id: 1,
			name: 'name',
			age: 14,
			email: 'a',
			test: { points: 12 },
		},
		[...roles, 'new']
	)
);
