import { Exclude, Expose } from 'class-transformer';
import { EncounterCopyAxleData } from './EncounterCopyAxleData';

@Exclude()
export class EncounterCopyAxleUnits {
	@Expose({ name: 'GROSS_DESIGN_WEIGHT1' })
	grossDesignWeight1!: string;

	@Expose({ name: 'GROSS_PERMITTED_WEIGHT1' })
	grossPermittedWeight1!: string;

	@Expose({ name: 'GROSS_ACTUAL_WEIGHT1' })
	grossActualWeight1!: string;

	@Expose({ name: 'EXCESS_GROSS_WEIGHT1' })
	excessGrossWeight1!: string;

	@Expose({ name: 'EXCESS_GROSS_WEIGHT1_PERC' })
	excessGrossWeightPercent1!: string;

	@Expose({ name: 'GROSS_DESIGN_WEIGHT2' })
	grossDesignWeight2!: string;

	@Expose({ name: 'GROSS_PERMITTED_WEIGHT2' })
	grossPermittedWeight2!: string;

	@Expose({ name: 'GROSS_ACTUAL_WEIGHT2' })
	grossActualWeight2!: string;

	@Expose({ name: 'EXCESS_GROSS_WEIGHT2' })
	excessGrossWeight2!: string;

	@Expose({ name: 'EXCESS_GROSS_WEIGHT2_PERC' })
	excessGrossWeightPercent2!: string;

	@Expose({ name: 'GROSS_DESIGN_WEIGHT3' })
	grossDesignWeight3!: string;

	@Expose({ name: 'GROSS_PERMITTED_WEIGHT3' })
	grossPermittedWeight3!: string;

	@Expose({ name: 'GROSS_ACTUAL_WEIGHT3' })
	grossActualWeight3!: string;

	@Expose({ name: 'EXCESS_GROSS_WEIGHT3' })
	excessGrossWeight3!: string;

	@Expose({ name: 'EXCESS_GROSS_WEIGHT3_PERC' })
	excessGrossWeightPercent3!: string;

	@Expose({ name: 'ACTUAL_TRAIN_WEIGHT' })
	actualTrainWeight!: string;

	@Expose({ name: 'PERMITTED_TRAIN_WEIGHT' })
	permittedTrainWeight!: string;

	@Expose({ name: 'EXCESS_TRAIN_WEIGHT' })
	excessTrainWeight!: string;

	@Expose({ name: 'EXCESS_TRAIN_WEIGHT_PERC' })
	excessTrainWeightPerc!: string;

	@Expose({ name: 'WEIGHT_PADS_MARKER' })
	weighPadUse!: string;

	axleData!: EncounterCopyAxleData[];
}
