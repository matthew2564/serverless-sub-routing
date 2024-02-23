import { EncounterCopySpecialReturn } from '../models/encounter/encounter-copy/EncounterCopySpecialReturn';

export const SpecialReturnCodesMap = new Map<number, keyof EncounterCopySpecialReturn>([
	[1, 'specialReturnCode1'],
	[2, 'specialReturnCode2'],
	[3, 'specialReturnCode3'],
	[4, 'specialReturnCode4'],
	[5, 'specialReturnCode5'],
	[6, 'specialReturnCode6'],
	[7, 'specialReturnCode7'],
	[8, 'specialReturnCode8'],
]);
