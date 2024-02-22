import { Inject, Service } from 'typedi';
import { OperatorVisitProvider } from '../providers/OperatorVisitProvider';
import { OperatorVisitRequest } from '../domain/models/operator/OperatorVisitRequest';
import { OperatorVisitData } from '../domain/models/operator/OperatorVisitData';
import { OperatorVisitResponse } from '../domain/models/response/OperatorVisitResponse';
import { LOGGER } from '../domain/di-tokens/di-tokens';
import { Logger } from '@aws-lambda-powertools/logger';
import { OperatorVisitVehicleEncounter } from '../domain/models/operator/OperatorVisitVehicleEncounter';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Service()
export class OperatorVisitService {
	constructor(
		@Inject() private operatorVisitProvider: OperatorVisitProvider,
		@Inject(LOGGER) private logger: Logger
	) {}

	async getOperatorVisit(operatorVisitRequest: OperatorVisitRequest): Promise<OperatorVisitResponse> {
		const operatorVisits = await this.operatorVisitProvider.getOperatorVisit(operatorVisitRequest);

		const opVisitsWithEncounters: OperatorVisitData[] = await Promise.all(
			operatorVisits.map(async (opVisit) => {
				let opVehicleEncounters: OperatorVisitVehicleEncounter[] = [];

				try {
					// Attempt to get vehicle encounters for each visit
					opVehicleEncounters = await this.operatorVisitProvider.getOperatorVehicleEncounter(opVisit);
				} catch (err) {
					// Log the error & continue processing other visits
					// 'opVehicleEncounters' will be an empty array due to the initialisation value
					this.logger.error('[ERROR]: getOperatorVehicleEncounter', { err });
				}

				// Return a new visit object with the updated vehicle encounters
				return {
					...opVisit,
					vehicleEncounters: opVehicleEncounters.map((encounter) => ({
						...encounter,
						encounterStartDate: DateTime.at(encounter.encounterStartDate).format('DD/MM/YYYY HH:mm:ss'),
						clientGuid: opVisit.clientGuid as string,
					})),
				} satisfies OperatorVisitData;
			})
		);

		return {
			timeStamp: new DateTime().format('DD/MM/YYYY HH:mm:ss'),
			count: opVisitsWithEncounters.length,
			operatorVisitsData: opVisitsWithEncounters,
		};
	}
}
