import { EncounterGeneralDetails } from '../encounter/encounter-copy/EncounterGeneralDetails';
import { EncounterOperator } from '../encounter/encounter-copy/EncounterOperator';
import { EncounterVehicle } from '../encounter/encounter-copy/EncounterVehicle';
import { EncounterDriver } from '../encounter/encounter-copy/EncounterDriver';
import { EncounterTrailer } from '../encounter/encounter-copy/EncounterTrailer';
import { EncounterJourney } from '../encounter/encounter-copy/EncounterJourney';
import { EncounterDangerousGoods } from '../encounter/encounter-copy/EncounterDangerousGoods';
import { EncounterDangerousGoodsQuestions } from '../encounter/encounter-copy/EncounterDangerousGoodsQuestions';
import { EncounterAdditionalInformation } from '../encounter/encounter-copy/EncounterAdditionalInformation';
import { EncounterCopyAxles } from '../encounter/encounter-copy/EncounterCopyAxles';
import { EncounterCopyNotices } from '../encounter/encounter-copy/EncounterCopyNotices';
import { EncounterCopyDefects } from '../encounter/encounter-copy/EncounterCopyDefects';
import { EncounterCopyDefectSummary } from '../encounter/encounter-copy/EncounterCopyDefectSummary';
import { EncounterCopyRoadWorthinessList } from '../encounter/encounter-copy/EncounterCopyRoadWorthinessList';
import { EncounterCopyOffenceData } from '../encounter/encounter-copy/EncounterCopyOffenceData';
import { EncounterCopyFixedPenalties } from '../encounter/encounter-copy/EncounterCopyFixedPenalties';

export class EncounterCopyResponse {
	timeStamp: string | null = null;
	encounterGeneralDetails: EncounterGeneralDetails | null;
	operator: EncounterOperator | null;
	encounterVehicleDetails: EncounterVehicle | null;
	encounterDriverOneDetails: EncounterDriver | null;
	encounterDriverTwoDetails: EncounterDriver | null;
	encounterTrailerOneDetails: EncounterTrailer | null;
	encounterTrailerTwoDetails: EncounterTrailer | null;
	encounterJourney: EncounterJourney | null;
	dangerousGoods: EncounterDangerousGoods | null;
	dangerousGoodsQuestions: EncounterDangerousGoodsQuestions | null;
	encounterAdditionalInformation: EncounterAdditionalInformation | null;
	encounterPrimaryVehicleWeights: EncounterCopyAxles | null;
	encounterTrailerOneWeights: EncounterCopyAxles | null;
	encounterTrailerTwoWeights: EncounterCopyAxles | null;
	notices: EncounterCopyNotices[] | null;
	encounterDefectsPrimaryVehicle: EncounterCopyDefects[] | null;
	encounterDefectsTrailerOne: EncounterCopyDefects[] | null;
	encounterDefectsTrailerTwo: EncounterCopyDefects[] | null;
	encounterDefectSummaryPrimaryVehicle: EncounterCopyDefectSummary | null;
	encounterDefectSummaryTrailer1: EncounterCopyDefectSummary | null;
	encounterDefectSummaryTrailer2: EncounterCopyDefectSummary | null;
	roadWorthinessChecklist: EncounterCopyRoadWorthinessList | null;
	fixedPenalty: EncounterCopyFixedPenalties[] | null;
	encounterOffencesDriverOne: EncounterCopyOffenceData[] | null;
	encounterOffencesDriverTwo: EncounterCopyOffenceData[] | null;
	encounterOffencesNotDriver: EncounterCopyOffenceData[] | null;

	constructor() {
		this.timeStamp = null;
		this.encounterGeneralDetails = null;
		this.operator = null;
		this.encounterVehicleDetails = null;
		this.encounterDriverOneDetails = null;
		this.encounterDriverTwoDetails = null;
		this.encounterTrailerOneDetails = null;
		this.encounterTrailerTwoDetails = null;
		this.encounterJourney = null;
		this.dangerousGoods = null;
		this.dangerousGoodsQuestions = null;
		this.encounterAdditionalInformation = null;
		this.encounterPrimaryVehicleWeights = null;
		this.encounterTrailerOneWeights = null;
		this.encounterTrailerTwoWeights = null;
		this.notices = null;
		this.encounterDefectsPrimaryVehicle = null;
		this.encounterDefectsTrailerOne = null;
		this.encounterDefectsTrailerTwo = null;
		this.encounterDefectSummaryPrimaryVehicle = null;
		this.encounterDefectSummaryTrailer1 = null;
		this.encounterDefectSummaryTrailer2 = null;
		this.roadWorthinessChecklist = null;
		this.fixedPenalty = null;
		this.encounterOffencesDriverOne = null;
		this.encounterOffencesDriverTwo = null;
		this.encounterOffencesNotDriver = null;
	}
}
