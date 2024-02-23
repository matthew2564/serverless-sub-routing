import { Inject, Service } from 'typedi';
import { DriverEncounterProvider } from '../providers/DriverEncounterProvider';
import { LOGGER } from '../domain/di-tokens/di-tokens';
import { Logger } from '@aws-lambda-powertools/logger';
import { DriverRequest } from '../domain/models/driver/DriverRequest';
import { EncounterData } from '../domain/models/encounter/EncounterData';
import { ObservedEncounterData } from '../domain/models/driver/ObservedEncounterData';
import { ObservedDriverData } from '../domain/models/driver/ObservedDriverData';
import { DriverEncounterResponse } from '../domain/models/response/DriverEncounterResponse';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Service()
export class DriverEncounterService {
	constructor(
		@Inject() private driverEncounterProvider: DriverEncounterProvider,
		@Inject(LOGGER) private logger: Logger
	) {}

	async getDriverEncounter(driverRequest: DriverRequest): Promise<DriverEncounterResponse> {
		let observedDriverList: ObservedDriverData[];

		if (driverRequest.address) {
			observedDriverList = await this.driverEncounterProvider.getObservedDriverByNameAndAddress(driverRequest);
		} else if (driverRequest.licenceNo) {
			observedDriverList = await this.driverEncounterProvider.getObservedDriverByLicenceNo(driverRequest);
		} else {
			observedDriverList = await this.driverEncounterProvider.getObservedDriverByName(driverRequest);
		}

		this.logger.info(`Found ${observedDriverList.length} observed drivers.`);

		const [observedEncounters, encounters] =
			// If there are multiple observed drivers, we don't want to return any encounter data
			observedDriverList.length > 1
				? // this results in empty arrays in this scenario
				  [[], []]
				: // otherwise, we want to return the encounter data for the requested driver
				  await Promise.all([
						this.getAssociatedObservedEncounterData(driverRequest),
						this.getAssociatedEncounterData(driverRequest),
				  ]);

		return {
			timeStamp: new DateTime().format('DD-MM-YYYY HH:mm:ss'),
			count: observedDriverList.length,
			drivers: observedDriverList,
			encounters,
			observedEncounters,
		};
	}

	private async getAssociatedObservedEncounterData(driverRequest: DriverRequest): Promise<ObservedEncounterData[]> {
		return this.driverEncounterProvider.getObservedEncountersByDriver(
			driverRequest,
			driverRequest.licenceNo ? 'licenceNo' : 'name'
		);
	}

	private async getAssociatedEncounterData(driverRequest: DriverRequest): Promise<EncounterData[]> {
		if (driverRequest.licenceNo) {
			return this.driverEncounterProvider.getDriverEnforcementByLicenceNo(driverRequest);
		}
		return this.driverEncounterProvider.getDriverEnforcementByName(driverRequest);
	}
}