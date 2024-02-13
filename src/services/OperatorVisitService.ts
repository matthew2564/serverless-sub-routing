import { Inject, Service } from 'typedi';
import { OperatorVisitProvider } from '../providers/OperatorVisitProvider';
import { OperatorVisitRequest } from '../domain/models/McModel';
import { OperatorVisitMap } from '../domain/models/OperatorVistitMapModel';
import { OperatorVisitResponseModel } from '../domain/models/OperatorVisitResponseModel';
import { LOGGER } from '../domain/di-tokens/di-tokens';
import { Logger } from '@aws-lambda-powertools/logger';
import { OperatorVehicleEncounterMap } from '../domain/models/OperatorVehicleEncounterMapModel';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Service()
export class OperatorVisitService {
	constructor(
		@Inject() private operatorVisitProvider: OperatorVisitProvider,
		@Inject(LOGGER) private logger: Logger
	) {}

	async getOperatorVisit(operatorVisitRequest: OperatorVisitRequest): Promise<OperatorVisitResponseModel> {
		const operatorVisits = await this.operatorVisitProvider.getOperatorVisit(operatorVisitRequest);

		const opVisitsWithEncounters: OperatorVisitMap[] = await Promise.all(
			operatorVisits.map(async (opVisit) => {
				let opVehicleEncounters: OperatorVehicleEncounterMap[] = [];

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
				};
			})
		);

		return {
			timeStamp: new Date().toISOString(),
			count: opVisitsWithEncounters.length,
			operatorVisitsData: opVisitsWithEncounters,
		};
	}
}
