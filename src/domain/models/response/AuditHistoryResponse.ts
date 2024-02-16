import { AuditEvent } from '../audit/AuditEvent';

export interface AuditHistoryResponse {
	timeStamp: string | undefined;
	auditHistory: AuditEvent[];
}
