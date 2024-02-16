import MyBatis, { Format, Params } from 'mybatis-mapper';
import { Connection, FieldPacket, RowDataPacket } from 'mysql2';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export abstract class QueryProvider {
	private static readonly namespace: string = 'dvsa.mc';

	protected constructor(
		private connection: Connection,
		mapperPath: string[]
	) {
		MyBatis.createMapper(mapperPath);
	}

	async query(mapperId: string, params: Params): Promise<unknown[]> {
		const query = MyBatis.getStatement(QueryProvider.namespace, mapperId, params, {
			language: 'sql',
			indent: '  ',
		} satisfies Format);

		const [rows]: [RowDataPacket[], FieldPacket[]] = await this.connection.promise().query(query);

		return rows;
	}

	async queryAndMapTo<T>(mapperId: string, params: Params, model: ClassConstructor<T>): Promise<T[]> {
		const rows = await this.query(mapperId, params);
		return rows.map((row) => plainToInstance(model, row));
	}

	async queryAndMapGetFirst<T>(mapperId: string, params: Params, model: ClassConstructor<T>): Promise<T> {
		const rows = await this.queryAndMapTo(mapperId, params, model);
		return rows[0];
	}
}
