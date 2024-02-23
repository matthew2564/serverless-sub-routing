import { Inject, Service } from 'typedi';
import { AuditHistoryProvider } from '../providers/AuditHistoryProvider';
import { AuditHistoryResponse } from '../domain/models/response/AuditHistoryResponse';
import { AuditEvent } from '../domain/models/audit/AuditEvent';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';
import { AevEventCode } from '../domain/models/audit/AevEventCode';

@Service()
export class AuditHistoryService {
	constructor(@Inject() private auditHistoryProvider: AuditHistoryProvider) {}

	async getAuditHistory(identifier: string): Promise<AuditHistoryResponse> {
		const auditHistory: AuditEvent[] = await this.auditHistoryProvider.getAuditHistory(identifier);

		if (auditHistory.length === 0) {
			return {
				timeStamp: new DateTime().format('DD/MM/YYYY HH:mm:ss'),
				auditHistory,
			};
		}

		const auditData: AuditEvent[] = await Promise.all(
			// destructure the callback argument to get the fkAevEventCode and the rest of the auditEvent without fkAevEventCode
			auditHistory.map(async ({ fkAevEventCode, ...auditEvent }) => ({
				// we then spread the object here
				...auditEvent,
				// and use the `fkAevEventCode` to do a lookup for the `aevEventCode`
				aevEventCode: (await this.auditHistoryProvider.getFkAevEvent(fkAevEventCode as string)) satisfies AevEventCode,
			}))
		);

		return {
			timeStamp: new DateTime().format('DD/MM/YYYY HH:mm:ss'),
			auditHistory: auditData,
		};
	}
}
