import { Expose } from 'class-transformer';

export class OperatorVisitVehicleEncounter {
	@Expose({ name: 'GENERATED_NUMBER' })
	generatedNumber!: string;

	@Expose({ name: 'CLIENT_GUID' })
	clientGuid!: string;

	@Expose({ name: 'RTE_VEH_ID' })
	rteVehicleId!: string;

	@Expose({ name: 'ENCNTR_START_DATE' })
	encounterStartDate!: string;

	@Expose({ name: 'FAS_GENERATED_NUMBER' })
	fasGeneratedNumber!: string;

	@Expose({ name: 'VEN_INSPECTION_RESULT' })
	vehInspectionResult!: string;

	@Expose({ name: 'USER_ID' })
	examiner!: string;
}
