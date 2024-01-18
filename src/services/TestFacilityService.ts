import { Inject, Service } from 'typedi';
import { TestFacilityProvider } from '../providers/TestFacilityProvider';
import { HttpError, NotFoundError } from 'routing-controllers';
import { ITestStation } from '../models/TestStation.model';

@Service()
export class TestFacilityService {
	constructor(@Inject() private testFacilityProvider: TestFacilityProvider) {
		this.testFacilityProvider = testFacilityProvider;
	}

	async getAllTestStations() {
		const testStations = await this.testFacilityProvider.findAllTestStations();

		if (!testStations || testStations.length === 0) {
			throw new NotFoundError(`No test stations found`);
		}

		return testStations;
	}

	async getTestStationEmailsByPNumber(testStationPNumber: string) {
		const testStations = await this.testFacilityProvider.findTestStationEmailsByPNumber(testStationPNumber);

		if (!testStations || testStations.length === 0) {
			throw new NotFoundError(`Test station with PNumber ${testStationPNumber} not found`);
		}

		return testStations;
	}

	async updateTestStation(testStation: ITestStation) {
		// look up the test station by the testStationPNumber
		const testStations = await this.testFacilityProvider.findTestStationEmailsByPNumber(testStation.testStationPNumber);

		// if the testStations response is empty, use the testStationId from the function input
		// if testStations is populated, then retrieve the testStationId from the first element
		const { testStationId } = !testStations || testStations.length === 0 ? testStation : testStations[0];

		// attempt the put with the payload and the calculated testStationId
		const statusCode = await this.testFacilityProvider.putTestStation(testStation, testStationId);

		// if DynamoDB does not return a 200 status indicting success, throw an error
		if (!statusCode || statusCode !== 200) {
			throw new HttpError(500, 'Could not create/update the desired test station');
		}

		// return the testStationId of the record
		return testStationId as string;
	}
}
