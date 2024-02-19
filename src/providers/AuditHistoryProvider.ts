import { Inject, Service } from 'typedi';
import { default as Session } from 'mybatis-mapper/create-session';
import { SESSION } from '../domain/di-tokens/di-tokens';
import { AevEventCode } from '../domain/models/audit/AevEventCode';
import { AuditEvent } from '../domain/models/audit/AuditEvent';

@Service()
export class AuditHistoryProvider {
	constructor(@Inject(SESSION) private session: Session) {}

	async getAuditHistory(identifier: string): Promise<AuditEvent[]> {
		// @TODO: Role check - getAllowEncounter
		console.log('getAuditHistory', identifier, this.session);

		return this.session.selectList('getAuditHistory', { identifier }, AuditEvent);
	}

	async getFkAevEvent(fkAevEventCode: string): Promise<AevEventCode | undefined> {
		return this.session.selectFirst('getAevEventCode', { fkAevEventCode }, AevEventCode);
	}
}
