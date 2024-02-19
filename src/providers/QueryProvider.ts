import MyBatis, { Format, Params } from 'mybatis-mapper';
import { Connection, FieldPacket, RowDataPacket } from 'mysql2';
import { ClassConstructor, plainToInstance } from 'class-transformer';

interface Session {
	select: (mapperId: string, params: Params) => Promise<unknown[]>;
	selectFirst: <T>(mapperId: string, params: Params, model: ClassConstructor<T>) => Promise<T>;
	selectList: <T>(mapperId: string, params: Params, model: ClassConstructor<T>) => Promise<T[]>;
}

export abstract class QueryProvider {
	protected constructor(private connection: Connection, private namespace: string, mapperPath: string[]) {
		MyBatis.createMapper(mapperPath);
	}

	public session: Session = {
		select: (mapperId: string, params: Params) => {
			return this.query(mapperId, params);
		},
		selectList: <T>(mapperId: string, params: Params, model: ClassConstructor<T>) => {
			return this.queryAndMapTo(mapperId, params, model);
		},
		selectFirst: <T>(mapperId: string, params: Params, model: ClassConstructor<T>) => {
			return this.queryAndMapGetFirst(mapperId, params, model)
		},
	}

	private async query(mapperId: string, params: Params): Promise<unknown[]> {
		const query = MyBatis.getStatement(this.namespace, mapperId, params, {
			language: 'sql',
			indent: '  ',
		} satisfies Format);

		const [rows]: [RowDataPacket[], FieldPacket[]] = await this.connection.promise().query(query);

		return rows;
	}

	private async queryAndMapTo<T>(mapperId: string, params: Params, model: ClassConstructor<T>): Promise<T[]> {
		const rows = await this.query(mapperId, params);
		return rows.map((row) => plainToInstance(model, row));
	}

	private async queryAndMapGetFirst<T>(mapperId: string, params: Params, model: ClassConstructor<T>): Promise<T> {
		const rows = await this.queryAndMapTo(mapperId, params, model);
		return rows[0];
	}

	async queryCatchAndMapTo<T>(mapperId: string, params: Params, model: ClassConstructor<T>): Promise<T[]> {
		try {
			return await this.queryAndMapTo(mapperId, params, model);
		} catch (error) {
			console.error('[ERROR]:\`queryCatchAndMapTo\`', error);
			return [];
		}
	}
}
