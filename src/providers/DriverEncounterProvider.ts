import { Container, Inject, Service } from 'typedi';
import { SESSION } from '../domain/di-tokens/di-tokens';
import { DriverRequest } from '../domain/models/driver/DriverRequest';
import { ObservedDriverData } from '../domain/models/driver/ObservedDriverData';
import { EncounterData } from '../domain/models/encounter/EncounterData';
import { ObservedEncounterData } from '../domain/models/driver/ObservedEncounterData';
import { ObservedIDs } from '../domain/models/driver/ObservedID';

@Service()
export class DriverEncounterProvider {
	get session() {
		return Container.get(SESSION);
	}

	async getObservedDriverByName(driverRequest: DriverRequest): Promise<ObservedDriverData[]> {
		return this.session.selectList('getObservedDriverByName', { ...driverRequest }, ObservedDriverData);
	}

	async getObservedDriverByLicenceNo(driverRequest: DriverRequest): Promise<ObservedDriverData[]> {
		// @TODO: Role check - getAllowDriverEncounter

		return this.session.selectList('getObservedDriverByLicNo', { ...driverRequest }, ObservedDriverData);
	}

	async getObservedDriverByNameAndAddress(driverRequest: DriverRequest): Promise<ObservedDriverData[]> {
		// @TODO: Role check - getAllowDriverEncounter

		return this.session.selectList('getIdentifiedDriverByNameAndAddress', { ...driverRequest }, ObservedDriverData);
	}

	async getObservedEncountersByDriver(driverRequest: DriverRequest, type: string): Promise<ObservedEncounterData[]> {
		// @TODO: Role check - getAllowDriverEncounter

		let mapperID: string = '';

		switch (type) {
			case 'licenceNo':
				mapperID = 'getEncounterIDsByLicNo';
				break;
			case 'name':
				mapperID = 'getEncounterIDsByName';
				break;
			default:
				// if not one of the expected mapperID's, then return empty for function
				return [];
		}

		const observedIDsList: ObservedIDs[] = await this.session.selectList(mapperID, { ...driverRequest }, ObservedIDs);

		if (!observedIDsList || observedIDsList.length === 0) {
			return [];
		}

		return this.session.selectList('getObservedEncountersByDriver', { list: observedIDsList }, ObservedEncounterData);
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

		const observedIDsList = await this.session.selectList(observedDriverMapperID, { ...driverRequest }, ObservedIDs);

		if (observedIDsList.length === 0) {
			return [];
		}

		return this.session.selectList('getDriverEncounterData', { list: observedIDsList }, EncounterData);
	}
}
