import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyLocation {
	@Expose({ name: 'FK_CST_CODE' })
	checkSiteType!: string;

	@Expose({ name: 'CLIENT_GUID' })
	clientGuid!: string;

	@Expose({ name: 'COU_DESCRIPTION' })
	couDescription!: string;

	@Expose({ name: 'CSI_NAME' })
	csiName!: string;

	@Expose({ name: 'CSI_TYPE' })
	csiType!: string;

	@Expose({ name: 'DELETION_MARKER' })
	deletionMarker!: string;

	@Expose({ name: 'DIRECTION' })
	direction!: string;

	@Expose({ name: 'USE_EHR_EMPLOYEE_ID_SETUP' })
	ifkSetupEmpId!: string;

	@Expose({ name: 'LAST_UPDATE' })
	lastUpdate!: string;

	@Expose({ name: 'RAR_CODE' })
	rarCode!: string;

	@Expose({ name: 'GENERATED_NUMBER' })
	rclCsiGeneratedNumber!: string;

	@Expose({ name: 'ROAD' })
	road!: string;

	@Expose({ name: 'TOWN_OR_VILLAGE' })
	townOrVillage!: string;
}
