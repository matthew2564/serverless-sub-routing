import { EncounterCopyAxleData } from './EncounterCopyAxleData';

export class EncounterCopyAxles {
	grossDesignWeight!: string;
	grossPermittedWeight!: string;
	grossActualWeight!: string;
	excessGrossWeight!: string;
	excessGrossWeightPercent!: string;
	actualTrainWeight!: string;
	permittedTrainWeight!: string;
	excessTrainWeight!: string;
	excessTrainWeightPerc!: string;
	weighPadUse!: string;
	axleData!: EncounterCopyAxleData[];
}
