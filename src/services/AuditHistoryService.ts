import { Inject, Service } from 'typedi';
import { AuditHistoryProvider } from '../providers/AuditHistoryProvider';
import { AuditHistoryResponse } from '../domain/models/response/AuditHistoryResponse';
import { AuditEvent } from '../domain/models/audit/AuditEvent';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Service()
export class AuditHistoryService {
	constructor(@Inject() private auditHistoryProvider: AuditHistoryProvider) {}

	async getAuditHistory(identifier: string): Promise<AuditHistoryResponse> {
		const auditHistory: AuditEvent[] = await this.auditHistoryProvider.getAuditHistory(identifier);

		if (auditHistory.length === 0) {
			return {
				timeStamp: new Date().toISOString(),
				auditHistory,
			};
		}

		const auditData: AuditEvent[] = await Promise.all(
			auditHistory.map(async (auditEvent) => ({
				...auditEvent,
				aevEventCode: await this.auditHistoryProvider.getFkAevEvent(auditEvent.fkAevEventCode as string),
				fkAevEventCode: undefined, // set as undefined to remove from payload
			}))
		);

		return {
			timeStamp: new DateTime().format('DD/MM/YYYY HH:mm:ss'),
			auditHistory: auditData,
		};
	}
}
