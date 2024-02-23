import { Container, Service } from 'typedi';
import { SESSION } from '../domain/di-tokens/di-tokens';
import { AevEventCode } from '../domain/models/audit/AevEventCode';
import { AuditEvent } from '../domain/models/audit/AuditEvent';

@Service()
export class AuditHistoryProvider {
	get session() {
		return Container.get(SESSION);
	}

	async getAuditHistory(identifier: string): Promise<AuditEvent[]> {
		// @TODO: Role check - getAllowEncounter
		return this.session.selectList('getAuditHistory', { identifier }, AuditEvent);
	}

	async getFkAevEvent(fkAevEventCode: string): Promise<AevEventCode> {
		const event = await this.session.selectOne('getAevEventCode', { fkAevEventCode }, AevEventCode);
		return event as AevEventCode;
	}
}
