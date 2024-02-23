import { Inject, Service } from 'typedi';
import { OutstandingProhibitionProvider } from '../providers/OutstandingProhibitionProvider';
import { OutstandingProhibitionResponse } from '../domain/models/response/OutstandingProhibitionResponse';
import { OutstandingProhibitionData } from '../domain/models/prohibition/OutstandingProhibitionData';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Service()
export class OutstandingProhibitionService {
	constructor(@Inject() private outstandingProhibitionProvider: OutstandingProhibitionProvider) {}

	async getOutstandingProhibitions(identifier: string): Promise<OutstandingProhibitionResponse> {
		const outstandingProhibitions: OutstandingProhibitionData[] =
			await this.outstandingProhibitionProvider.getOutstandingProhibitions(identifier);

		return {
			timeStamp: new DateTime().format('DD/MM/YYYY HH:mm:ss'),
			outstandingProhibitions,
		};
	}
}
