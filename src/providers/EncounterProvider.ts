import { Container, Service } from 'typedi';
import { SESSION } from '../domain/di-tokens/di-tokens';
import { EncounterData } from '../domain/models/encounter/EncounterData';
import { EncounterDetail } from '../domain/models/encounter/EncounterDetail';
import { EncounterAxle } from '../domain/models/encounter/EncounterAxle';
import { Params } from 'mybatis-mapper';
import { EncounterNotice } from '../domain/models/encounter/EncounterNotice';
import { EncounterOffence } from '../domain/models/encounter/EncounterOffence';
import { EncounterDefect } from '../domain/models/encounter/EncounterDefect';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Service()
export class EncounterProvider {
	get session() {
		return Container.get(SESSION);
	}

	async getEncounter(identifier: string, vin: string | null): Promise<EncounterData[]> {
		// @TODO: Role check - getAllowEncounter

		return this.session.selectList('getEncounterData', { identifier, vin }, EncounterData);
	}

	async getEncounterByIdentifier(identifier: string): Promise<EncounterDetail | null> {
		// @TODO: Role check - getAllowEncounter

		return await this.getEncounterDetails(
			await this.session.selectOne('getEncounterDetailData', { identifier }, EncounterDetail)
		);
	}

	async getEncounterTrailer(identifier: string): Promise<EncounterDetail | null> {
		// @TODO: Role check - getAllowEncounter

		return await this.getEncounterDetails(
			await this.session.selectOne('getEncounterTrailer', { identifier }, EncounterDetail)
		);
	}

	private async getEncounterDetails(encounterDetail: EncounterDetail | undefined): Promise<EncounterDetail | null> {
		if (!encounterDetail) return null;

		const idParam = { id: encounterDetail.encounterIdentifier };

		// Use Promise.all to run all the top-level queries in parallel as they are not dependent on each other
		// i.e. 'getEncounterAxlesById', 'getEncounterNoticesById', 'getOtherOffencesById'
		//
		// 1. Inside the Promise.all, we use `selectAndCatchSilently` to run the query and map the result to the given model
		// 2. We use `selectAndCatchSilently` to catch any errors and log them, this stops the error from propagating and
		// stopping the entire process
		// 3. For `getEncounterNoticesById`, if the query is successful, we use Promise.all to run another
		// set of queries in parallel for defects and offences
		const [encounterAxles, encounterNotices, otherOffences] = await Promise.all([
			this.session.selectAndCatchSilently('getEncounterAxlesById', idParam, EncounterAxle),

			this.session.selectAndCatchSilently('getEncounterNoticesById', idParam, EncounterNotice).then((notices) =>
				Promise.all(
					notices.map(async (notice) => {
						const noticeParams = {
							genNum: notice.noticeGeneratedNumber,
							noticeType: notice.noticeType,
							noticeInputDate: DateTime.at(notice.noticeInputDate, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DDTHH:mm:ss'),
						};

						const [encounterDefects, encounterOffences] = await Promise.all([
							this.session.selectAndCatchSilently('getEncounterDefectsById', noticeParams, EncounterDefect),
							this.session.selectAndCatchSilently('getEncounterOffencesById', noticeParams, EncounterOffence),
						]);

						return { ...notice, encounterDefects, encounterOffences };
					})
				)
			),

			this.session.selectAndCatchSilently('getOtherOffencesById', idParam, EncounterOffence),
		]);

		return {
			...encounterDetail,
			encounterAxles,
			encounterNotices,
			otherOffences,
		};
	}
}
