import { Container, Service } from 'typedi';
import { SESSION } from '../domain/di-tokens/di-tokens';
import { EncounterCopyIdentifier } from '../domain/models/encounter/encounter-copy/EncounterCopyIdentifier';
import { EncounterJourney } from '../domain/models/encounter/encounter-copy/EncounterJourney';
import { EncounterDangerousGoods } from '../domain/models/encounter/encounter-copy/EncounterDangerousGoods';
import { EncounterTrailer } from '../domain/models/encounter/encounter-copy/EncounterTrailer';
import { EncounterDriver } from '../domain/models/encounter/encounter-copy/EncounterDriver';
import { EncounterVehicle } from '../domain/models/encounter/encounter-copy/EncounterVehicle';
import { EncounterGeneralDetails } from '../domain/models/encounter/encounter-copy/EncounterGeneralDetails';
import { EncounterCopyLocation } from '../domain/models/encounter/encounter-copy/EncounterCopyLocation';
import { EncounterStoppingOfficer } from '../domain/models/encounter/encounter-copy/EncounterStoppingOfficer';
import { EncounterCopyAxleUnits } from '../domain/models/encounter/encounter-copy/EncounterCopyAxleUnits';
import { EncounterCopyAxleData } from '../domain/models/encounter/encounter-copy/EncounterCopyAxleData';
import { EncounterOperator } from '../domain/models/encounter/encounter-copy/EncounterOperator';
import { EncounterCopyNationality } from '../domain/models/encounter/encounter-copy/EncounterCopyNationality';
import { OCRSSnapshot } from '../domain/models/operator/OCRSSnapshot';
import { EncounterDangerousGoodsStatus } from '../domain/models/encounter/encounter-copy/EncounterDangerousGoodsStatus';
import { EncounterDangerousGoodsQuestions } from '../domain/models/encounter/encounter-copy/EncounterDangerousGoodsQuestions';
import { DangerousGoodsStatusMap } from '../domain/maps/DangerousGoodsStatusMap';
import { EncounterCopyRoadWorthinessList } from '../domain/models/encounter/encounter-copy/EncounterCopyRoadWorthinessList';
import { EncounterCopyRoadWorthiness } from '../domain/models/encounter/encounter-copy/EncounterCopyRoadWorthiness';
import { EncounterCopyInspectionLevel } from '../domain/models/encounter/encounter-copy/EncounterCopyInspectionLevel';
import { EncounterAdditionalInformation } from '../domain/models/encounter/encounter-copy/EncounterAdditionalInformation';
import { EncounterAdditionalText } from '../domain/models/encounter/encounter-copy/EncounterAdditionalText';
import { EncounterCopySpecialReturnFlag } from '../domain/models/encounter/encounter-copy/EncounterCopySpecialReturnFlag';
import { SpecialReturnCodesMap } from '../domain/maps/SpecialReturnCodesMap';
import { EncounterCopyDefects } from '../domain/models/encounter/encounter-copy/EncounterCopyDefects';
import { EncounterCopyDefectCategory } from '../domain/models/encounter/encounter-copy/EncounterCopyDefectCategory';
import { EncounterCopyDefectSummary } from '../domain/models/encounter/encounter-copy/EncounterCopyDefectSummary';
import { EncounterCopyNotices } from '../domain/models/encounter/encounter-copy/EncounterCopyNotices';
import { EncounterCopyOffenceData } from '../domain/models/encounter/encounter-copy/EncounterCopyOffenceData';
import { EncounterCopyOffenceNoticeTypeXref } from '../domain/models/encounter/encounter-copy/EncounterCopyOffenceNoticeTypeXref';
import { EncounterCopyFixedPenalties } from '../domain/models/encounter/encounter-copy/EncounterCopyFixedPenalties';
import { omitBy } from 'lodash';

@Service()
export class EncounterCopyProvider {
	private static readonly GB_NI = /GB|NI/;
	private static readonly TRAILER_ONE = 'trailerOne';
	private static readonly TRAILER_TWO = 'trailerTwo';

	get session() {
		return Container.get(SESSION);
	}

	async getEncounterIds(encounterID: string) {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		return this.session.selectOne('getEncounterIds', { encounterID }, EncounterCopyIdentifier);
	}

	async getGeneralDetails(vehicleEncounterId: string): Promise<EncounterGeneralDetails | undefined> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms

		const generalDetails = await this.session.selectOne(
			'getGeneralDetails',
			{ vehicleEncounterId },
			EncounterGeneralDetails
		);

		const [location, esoData] = await Promise.all([
			// if csiGeneratedNumber exists, then get the location details
			generalDetails?.csiGeneratedNumber
				? this.session.selectOne(
						'getCheckSiteLocation',
						{ csiId: generalDetails.csiGeneratedNumber },
						EncounterCopyLocation
				  )
				: Promise.resolve(null),

			this.session.selectOne('getESOData', { identifier: vehicleEncounterId }, EncounterStoppingOfficer),
		]);

		if (generalDetails && location) {
			generalDetails.encounterLocationObject = location satisfies EncounterCopyLocation;
		}

		if (generalDetails && esoData) {
			generalDetails.stoppingOfficer = esoData;
		}

		return generalDetails;
	}

	async getOperator(vehicleEncounterId: string): Promise<EncounterOperator | null> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms

		const operator = await this.session.selectOne('getOperator', { vehicleEncounterId }, EncounterOperator);

		// if encounterOperator does not exist or does not have a `genNum` then return null
		if (!operator || !operator?.genNum) {
			return null;
		}

		const encounterOperator = omitBy(operator, 'genNum') as EncounterOperator;

		const [encounterCopyNationality, ocrs] = (await Promise.all([
			// get the nationality using `nationalityCode`
			this.session.selectOne(
				'getNationality',
				{ vehicleEncounterId: encounterOperator.nationalityCode },
				EncounterCopyNationality
			),

			// get the OCRS snapshot data
			this.session.selectList('getOCRSSnapshots', { encounterId: vehicleEncounterId }, OCRSSnapshot),
		])) as [EncounterCopyNationality, OCRSSnapshot[]];

		if (EncounterCopyProvider.GB_NI.test(encounterOperator.nationalityCode)) {
			encounterOperator.operatorNationality = encounterCopyNationality;
		} else {
			encounterOperator.operatorCountry = encounterCopyNationality;
		}

		encounterOperator.ocrs = ocrs;

		return encounterOperator;
	}

	async getVehicle(vehicleEncounterId: string): Promise<EncounterVehicle | undefined> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		return this.session.selectOne('getVehicle', { vehicleEncounterId }, EncounterVehicle);
	}

	async getDriver(vehicleEncounterId: string): Promise<EncounterDriver[]> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		return this.session.selectList('getDriver', { vehicleEncounterId }, EncounterDriver);
	}

	async getTrailer(vehicleEncounterId: string): Promise<EncounterTrailer | undefined> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		return this.session.selectOne('getTrailer', { vehicleEncounterId }, EncounterTrailer);
	}

	async getTrailerTwo(vehicleEncounterId: string): Promise<EncounterTrailer | undefined> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		return this.session.selectOne('getTrailerTwo', { vehicleEncounterId }, EncounterTrailer);
	}

	async getJourney(vehicleEncounterId: string): Promise<EncounterJourney | undefined> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		return this.session.selectOne('getJourney', { vehicleEncounterId }, EncounterJourney);
	}

	async getDangerousGoods(vehicleEncounterId: string): Promise<EncounterDangerousGoods | undefined> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		return this.session.selectOne('getDangerousGoods', { vehicleEncounterId }, EncounterDangerousGoods);
	}

	async getDangerousGoodsQuestions(vehicleEncounterId: string): Promise<EncounterDangerousGoodsQuestions | null> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms

		const dangerousGoodsStatusList = await this.session.selectList(
			'getDangerousGoodsStatus',
			{ vehicleEncounterId },
			EncounterDangerousGoodsStatus
		);

		if (!dangerousGoodsStatusList || dangerousGoodsStatusList?.length === 0) {
			return null;
		}

		const dgQuestionResult = new EncounterDangerousGoodsQuestions();

		for (const status of dangerousGoodsStatusList) {
			// Use the Map to dynamically assign the statusName to the corresponding property in dgQuestionResult
			const question = DangerousGoodsStatusMap.get(status.fkHchGeneratedNumber?.toString());

			if (question) {
				dgQuestionResult[question] = status.statusName;
			}
		}

		return dgQuestionResult;
	}

	async getAdditionalInformation(vehicleEncounterId: string): Promise<EncounterAdditionalInformation | null> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms

		const additionalInfo = await this.session.selectOne(
			'getAdditionalInformation',
			{ vehicleEncounterId },
			EncounterAdditionalInformation
		);
		if (!additionalInfo) return null;

		// get additionalTexts and if populated assign to additionalInfo
		const additionalTexts = await this.session.selectList(
			'getAdditionalText',
			{ vehicleEncounterId },
			EncounterAdditionalText
		);
		if (additionalTexts?.length > 0) additionalInfo.additionalText = additionalTexts;

		// check if the exerciseCode is set, and if not to return the additionalInfo as is
		const exerciseCode = additionalInfo.specialReturnCode?.exerciseCode;
		if (!exerciseCode) return additionalInfo;

		// get the specialReturnFlagList and if empty return the additionalInfo as is
		const specialReturnFlagList = await this.session.selectList(
			'getSpecialReturnFlag',
			{ vehicleEncounterId: exerciseCode },
			EncounterCopySpecialReturnFlag
		);
		if (specialReturnFlagList?.length === 0) return additionalInfo;

		for (const flagList of specialReturnFlagList) {
			const action = SpecialReturnCodesMap.get(flagList.codeNumber);

			if (action) {
				flagList.selected = additionalInfo.specialReturnCode[action] as string;
			} else {
				flagList.selected = 'N';
			}
		}
		additionalInfo.specialReturnCode.specialReturnFlag = specialReturnFlagList;

		return additionalInfo;
	}

	async getAxles(vehicleEncounterId: string) {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		const axleData = await this.session.selectList('getAxleData', { id: vehicleEncounterId }, EncounterCopyAxleData);

		if (axleData?.length === 0) {
			return null;
		}

		const axleUnits = await this.session.selectOne('getAxles', { vehicleEncounterId }, EncounterCopyAxleUnits);

		if (axleUnits) {
			axleUnits.axleData = axleData;
		}

		return axleUnits;
	}

	async getDefects(vehicleEncounterId: string): Promise<EncounterCopyDefects[]> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms

		const defectsList = await this.session.selectList(
			'getDefectsAll',
			{ id: vehicleEncounterId },
			EncounterCopyDefects
		);
		if (defectsList?.length === 0) return [];

		for (const defect of defectsList) {
			// if the DUD_GEN_NUM field in the MC_ACTUAL_DEFECT table is 0 then this is a non categorised defect.
			// So we manually set the defectCategory object to a non-categorised defect and set the other sections
			// of the defect tree to null
			if (defect.dudGenNum === 0) {
				const defCat = new EncounterCopyDefectCategory();

				defCat.defectCategoryPart = 1;
				defCat.defectCategory = 'Non-categorised Defect';
				defCat.defectCategoryNumber = 99;
				defCat.deletionMarker = 'N';

				defect.defectSectionValue = 'Non-categorised Defect';
				defect.defectCategory = defCat;
				defect.defectSubSection = null;
				defect.defectDesc = null;
				defect.defectText = null;
				defect.defectSeverity = null;
			}
		}
		return defectsList;
	}

	async getDefectSummary(vehicleEncounterId: string): Promise<EncounterCopyDefectSummary | undefined> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		return this.session.selectOne('getDefectSummary', { id: vehicleEncounterId }, EncounterCopyDefectSummary);
	}

	async getNotices(
		encounterID: string | null,
		encounterTwoId: string | null,
		encounterThreeId: string | null
	): Promise<EncounterCopyNotices[]> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms

		// add all params to an array and filter out any nullish values, convert all to string to ensure no type mismatches
		const encounterIdentifiers = [encounterID, encounterTwoId, encounterThreeId]
			.filter((id) => !!id)
			.map((id) => id?.toString());

		const noticesList = await this.session.selectList(
			'getNotices',
			{ list: encounterIdentifiers },
			EncounterCopyNotices
		);
		if (!noticesList || noticesList?.length === 0) return [];

		for (const encounterResultList of noticesList) {
			if (encounterResultList.encounterIdentifier?.toString() === encounterID?.toString()) {
				encounterResultList.noticeUnit = 'primary';
				encounterResultList.issueUnitType = 'vehicle';

				// when a notice that has an offence has no Fixed Penalty set the FP object to null
				if (encounterResultList.noticeRef === null) {
					encounterResultList.fixedPenaltyNotice = null;
				}
			} else if (encounterResultList.encounterIdentifier?.toString() === encounterTwoId?.toString()) {
				encounterResultList.noticeUnit = EncounterCopyProvider.TRAILER_ONE;
				encounterResultList.issueUnitType = EncounterCopyProvider.TRAILER_ONE;

				// when a notice that has an offence has no Fixed Penalty set the FP object to null
				if (encounterResultList.noticeRef === null) {
					encounterResultList.fixedPenaltyNotice = null;
				}
			} else {
				encounterResultList.noticeUnit = EncounterCopyProvider.TRAILER_TWO;
				encounterResultList.issueUnitType = EncounterCopyProvider.TRAILER_TWO;

				// when a notice that has an offence has no Fixed Penalty set the FP object to null
				if (encounterResultList.noticeRef === null) {
					encounterResultList.fixedPenaltyNotice = null;
				}
			}
		}
		return noticesList;
	}

	async getRoadWorthinessChecklist(encounterID: string): Promise<EncounterCopyRoadWorthinessList | null> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms

		const [roadWorthinessList, inspectionLevel] = await Promise.all([
			this.session.selectList(
				'getRoadWorthinessChecklist',
				{ vehicleEncounterId: encounterID },
				EncounterCopyRoadWorthiness
			),
			this.session.selectOne('getRwList', { vehicleEncounterId: encounterID }, EncounterCopyInspectionLevel),
		]);

		if (!roadWorthinessList || roadWorthinessList?.length === 0) {
			return null;
		}

		return {
			inspectionLevel: inspectionLevel as EncounterCopyInspectionLevel,
			roadWorthinessList: roadWorthinessList,
		};
	}

	async getFixedPenalties(
		encounterID: string | null,
		encounterTwoId: string | null,
		encounterThreeId: string | null
	): Promise<EncounterCopyFixedPenalties[]> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms

		// add all params to an array and filter out any nullish values
		const encounterIdentifiers = [encounterID, encounterTwoId, encounterThreeId]
			.filter((id) => !!id)
			.map((id) => id?.toString());

		const fixedPenaltiesList = await this.session.selectList(
			'getPenalties',
			{ list: encounterIdentifiers },
			EncounterCopyFixedPenalties
		);
		if (!fixedPenaltiesList || fixedPenaltiesList?.length === 0) return fixedPenaltiesList;

		for (const encounterResultList of fixedPenaltiesList) {
			//set encounter unit
			if (encounterResultList.encounterId?.toString() === encounterID?.toString()) {
				encounterResultList.encounterUnit = 'primary';
			} else if (encounterResultList.encounterId?.toString() === encounterTwoId?.toString()) {
				encounterResultList.encounterUnit = EncounterCopyProvider.TRAILER_ONE;
			} else {
				encounterResultList.encounterUnit = EncounterCopyProvider.TRAILER_TWO;
			}

			//set issue unit
			if (encounterResultList.issueUnitType === 'A') {
				encounterResultList.issueUnitType = 'driverOne';
			} else if (encounterResultList.issueUnitType === 'O') {
				encounterResultList.issueUnitType = 'driverTwo';
			}
		}

		return fixedPenaltiesList;
	}

	async getOffences(
		encounterID: string | null,
		encounterTwoId: string | null,
		encounterThreeId: string | null
	): Promise<EncounterCopyOffenceData[]> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms

		// add all params to an array and filter out any nullish values
		const encounterIdentifiers = [encounterID, encounterTwoId, encounterThreeId].filter((id) => !!id);

		const offenceDataList = await this.session.selectList(
			'getOffencesAll',
			{ list: encounterIdentifiers },
			EncounterCopyOffenceData
		);
		if (!offenceDataList || offenceDataList?.length === 0) return [];

		for (const encounterResultList of offenceDataList) {
			// insert offence code and generated number into hash map
			const params = {
				offenceCode: encounterResultList.offence?.offenceCode,
				genNum: encounterResultList.aofGenNum,
			};

			// get data from MC_OFFENCE_NOTICE_TYPE_XREF table and populate offenceXref object
			const noticeTypeXrefList = await this.session.selectList(
				'getOffNotTypeXref',
				params,
				EncounterCopyOffenceNoticeTypeXref
			);
			if (noticeTypeXrefList?.length > 0) {
				encounterResultList.offence.offenceXref = noticeTypeXrefList;
			}
		}
		return offenceDataList;
	}
}
