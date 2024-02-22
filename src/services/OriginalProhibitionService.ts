import { Inject, Service } from 'typedi';
import { OriginalProhibitionRequest } from '../domain/models/prohibition/OriginalProhibitionRequest';
import { OriginalProhibitionProvider } from '../providers/OriginalProhibitionProvider';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';
import { OriginalProhibitionResponse } from '../domain/models/response/OriginalProhibitionResponse';

@Service()
export class OriginalProhibitionService {
	private static readonly ROADWORTHINESS_CODES = ['BMRZ01', 'FMRZ01', 'BMVZ01', 'BMXZ01', 'FMXZ01', 'BMFZ01'];
	private static readonly ROADWORTHINESS_SEARCH_CODES = ['BMPZ01', 'FMPZ01'];
	private static readonly OFFENCE_CODES = ['BORZ01', 'FORZ01'];
	private static readonly OFFENCE_SEARCH_CODES = ['BOPA01', 'FOPA01', 'BOPB01', 'FOPB01'];
	private static readonly OVERWEIGHT_CODES = ['BWRZ01', 'FWRZ01'];
	private static readonly OVERWEIGHT_SEARCH_CODES = ['BWPZ01', 'FWPZ01'];
	private static readonly DIRECTION_CODES = ['BWDZ01', 'FWDZ01'];
	private static readonly DIRECTION_SEARCH_CODES = ['BOPA01', 'FOPA01', 'BOPB01', 'FOPB01', 'BWRZ01', 'FWRZ01'];

	constructor(@Inject() private originalProhibitionProvider: OriginalProhibitionProvider) {}

	async processRequest(
		originalProhibitionRequest: OriginalProhibitionRequest
	): Promise<OriginalProhibitionResponse | null> {
		const ntyCode = this.getNtyCodes(originalProhibitionRequest);

		const issueDate = await this.originalProhibitionProvider.getIssueDate({
			...originalProhibitionRequest,
			ntyCodes: ntyCode,
		});

		if (!issueDate) {
			return null;
		}

		const [originalProhibitionDate, originalProhibitionTime] = issueDate.split(' ');

		return {
			timeStamp: new DateTime().format('DD/MM/YYYY HH:mm:ss'),
			originalProhibitionDate,
			originalProhibitionTime,
			originalProhibitionRequest,
		};
	}

	getNtyCodes(originalProhibitionRequest: OriginalProhibitionRequest) {
		if (OriginalProhibitionService.ROADWORTHINESS_CODES.includes(originalProhibitionRequest.fkNotNtyCode)) {
			return OriginalProhibitionService.ROADWORTHINESS_SEARCH_CODES;
		}

		if (OriginalProhibitionService.OFFENCE_CODES.includes(originalProhibitionRequest.fkNotNtyCode)) {
			return OriginalProhibitionService.OFFENCE_SEARCH_CODES;
		}

		if (OriginalProhibitionService.OVERWEIGHT_CODES.includes(originalProhibitionRequest.fkNotNtyCode)) {
			return OriginalProhibitionService.OVERWEIGHT_SEARCH_CODES;
		}

		if (OriginalProhibitionService.DIRECTION_CODES.includes(originalProhibitionRequest.fkNotNtyCode)) {
			return OriginalProhibitionService.DIRECTION_SEARCH_CODES;
		}

		return [];
	}
}
