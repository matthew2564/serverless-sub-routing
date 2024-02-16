import { Inject, Service } from 'typedi';
import { CONNECTION } from '../domain/di-tokens/di-tokens';
import { Connection } from 'mysql2';
import path from 'path';
import { AevEventCode } from '../domain/models/audit/AevEventCode';
import { AuditEvent } from '../domain/models/audit/AuditEvent';
import { QueryProvider } from './QueryProvider';

@Service()
export class AuditHistoryProvider extends QueryProvider {
	private static readonly MAPPER_PATHS = [path.resolve(__dirname, './mappers/AuditHistoryMapper.xml')];

	constructor(@Inject(CONNECTION) connection: Connection) {
		super(connection, AuditHistoryProvider.MAPPER_PATHS);
	}

	async getAuditHistory(identifier: string): Promise<AuditEvent[]> {
		// @TODO: Role check - getAllowEncounter

		return this.queryAndMapTo('getAuditHistory', { identifier }, AuditEvent);
	}

	async getFkAevEvent(fkAevEventCode: string): Promise<AevEventCode> {
		return this.queryAndMapGetFirst('getAevEventCode', { fkAevEventCode }, AevEventCode);
	}
}
