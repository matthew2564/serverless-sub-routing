import {Inject, Service} from "typedi";
import {AuditHistoryProvider} from "../providers/AuditHistoryProvider";

@Service()
export class FixedPenaltyService {

    constructor(@Inject() private auditHistoryProvider: AuditHistoryProvider) {}

    async search(identifier: string) {

    }
}
