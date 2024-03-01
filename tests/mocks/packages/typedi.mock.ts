import { Container } from 'typedi';

export class TypeDIMock {
	static container = {} as Record<string, unknown>;

	static factory = {
		...jest.requireActual('typedi'),
		Container: {
			get: (key: string) => TypeDIMock.container[key],
			set: (type: string, value: unknown) => {
				TypeDIMock.container[type] = value;
			},
		} satisfies Container,
	};

	static session: {
		selectList: jest.Mock<Promise<unknown[]>>;
		selectOne: jest.Mock<Promise<unknown | undefined>>;
	} = {
		selectList: jest.fn(),
		selectOne: jest.fn(),
	};
}
