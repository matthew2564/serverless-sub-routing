import { OriginalProhibitionRequest } from '../models/prohibition/OriginalProhibitionRequest';

const NTY_CODES = [
	'BMRZ01',
	'FMRZ01',
	'BMVZ01',
	'BMXZ01',
	'FMXZ01',
	'BORZ01',
	'FORZ01',
	'BWRZ01',
	'FWRZ01',
	'BWDZ01',
	'FWDZ01',
	'BMFZ01',
];

const FK_NOT_NTY_CODE = 'fkNotNtyCode';
const RTE_VEH_ID = 'rteVehId';
const CURRENT_ENCOUNTER_START_DATE_TIME = 'currentEncounterStartDateTime';

export function originalProhibitionPayloadValidator(data: OriginalProhibitionRequest): {
	valid: boolean;
	error?: string;
} {
	if (data.fkNotNtyCode === null || data.fkNotNtyCode === undefined) {
		return { valid: false, error: buildNullMessage(FK_NOT_NTY_CODE) };
	}

	if (data.fkNotNtyCode === '') {
		return { valid: false, error: buildEmptyMessage(FK_NOT_NTY_CODE) };
	}

	if (!NTY_CODES.includes(data.fkNotNtyCode)) {
		return { valid: false, error: `${FK_NOT_NTY_CODE} is not valid.` };
	}

	if (data.currentEncounterStartDateTime === null || data.currentEncounterStartDateTime === undefined) {
		return { valid: false, error: buildNullMessage(CURRENT_ENCOUNTER_START_DATE_TIME) };
	}

	if (data.currentEncounterStartDateTime === '') {
		return { valid: false, error: buildEmptyMessage(CURRENT_ENCOUNTER_START_DATE_TIME) };
	}

	if (data.rteVehId === null || data.rteVehId === undefined) {
		return { valid: false, error: buildNullMessage(RTE_VEH_ID) };
	}

	if (data.rteVehId === '') {
		return { valid: false, error: buildEmptyMessage(RTE_VEH_ID) };
	}

	return { valid: true };
}

const buildNullMessage = (field: string) => {
	return `${field} must not be null.`;
};

const buildEmptyMessage = (field: string) => {
	return `${field} is mandatory.`;
};
