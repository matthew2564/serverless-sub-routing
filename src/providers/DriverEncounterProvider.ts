import { Inject, Service } from 'typedi';
import { CONNECTION } from '../domain/di-tokens/di-tokens';
import { Connection } from 'mysql2';
import path from 'path';
import { plainToInstance } from 'class-transformer';
import { DriverRequest } from '../domain/models/driver/DriverRequest';
import { ObservedDriverData } from '../domain/models/driver/ObservedDriverData';
import { EncounterData } from '../domain/models/encounter/EncounterData';
import { ObservedEncounterData } from '../domain/models/driver/ObservedEncounterData';
import { QueryProvider } from './QueryProvider';
import { ObservedIDs } from '../domain/models/driver/ObservedID';

@Service()
export class DriverEncounterProvider extends QueryProvider {
	private static readonly MAPPER_PATHS = [path.resolve(__dirname, './mappers/DriverMapper.xml')];

	constructor(@Inject(CONNECTION) connection: Connection) {
		super(connection, DriverEncounterProvider.MAPPER_PATHS);
	}

	async getObservedDriverByName(driverRequest: DriverRequest): Promise<ObservedDriverData[]> {
		// @TODO: Role check - getAllowDriverEncounter

		return this.queryAndMapTo('getObservedDriverByName', { ...driverRequest }, ObservedDriverData);
	}

	async getObservedDriverByLicenceNo(driverRequest: DriverRequest): Promise<ObservedDriverData[]> {
		// @TODO: Role check - getAllowDriverEncounter

		return this.queryAndMapTo('getObservedDriverByLicNo', { ...driverRequest }, ObservedDriverData);
	}

	async getObservedDriverByNameAndAddress(driverRequest: DriverRequest): Promise<ObservedDriverData[]> {
		// @TODO: Role check - getAllowDriverEncounter

		return this.queryAndMapTo('getIdentifiedDriverByNameAndAddress', { ...driverRequest }, ObservedDriverData);
	}

	async getObservedEncountersByDriver(driverRequest: DriverRequest, type: string): Promise<ObservedEncounterData[]> {
		let mapperID: string = '';

		switch (type) {
			case 'licenceNo':
				mapperID = 'getEncounterIDsByLicNo';
				break;
			case 'name':
				mapperID = 'getEncounterIDsByName';
				break;
			default:
				return [];
		}

		// @TODO: Role check - getAllowDriverEncounter

		return this.queryAndMapTo(mapperID, { ...driverRequest }, ObservedEncounterData);
	}

	async getDriverEnforcementByName(driverRequest: DriverRequest): Promise<EncounterData[]> {
		return this.getDriverEnforcement(driverRequest, 'getEncounterIDsByName');
	}

	async getDriverEnforcementByLicenceNo(driverRequest: DriverRequest): Promise<EncounterData[]> {
		return this.getDriverEnforcement(driverRequest, 'getEncounterIDsByLicNo');
	}

	private async getDriverEnforcement(
		driverRequest: DriverRequest,
		observedDriverMapperID: string
	): Promise<EncounterData[]> {
		// @TODO: We could replace this with a subquery using the `include` tag
		// The <foreach> can be replaced with an `in` clause in the subquery, to eliminate a DB visit

		const observedIDsList = await this.query(observedDriverMapperID, { ...driverRequest });

		if (observedIDsList.length === 0) {
			return [];
		}

		return this.queryAndMapTo(
			'getDriverEncounterData',
			{ list: observedIDsList.map((row) => plainToInstance(ObservedIDs, row)) },
			EncounterData
		);
	}
}
