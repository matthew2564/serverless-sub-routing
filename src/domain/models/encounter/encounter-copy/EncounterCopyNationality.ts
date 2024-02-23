import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyNationality {
	@Expose({ name: 'IRL_CARD_ISS_AUTH' })
	cardIssuingAuthorityInd!: string;

	@Expose({ name: 'IRL_COUNTRY' })
	irlCountry!: string;

	@Expose({ name: 'IRL_DRIV_LIC_AUTH' })
	drivingLicenceAuthority!: string;

	@Expose({ name: 'IRL_CODE' })
	irlCode!: string;

	@Expose({ name: 'IRL_INTELL_SUB_IND' })
	intelligenceSubjectInd!: string;

	@Expose({ name: 'IRL_VEH_IND' })
	vehicleIndicator!: string;

	@Expose({ name: 'IRL_INT_NUM_REG_CODE' })
	intRegNumberCode!: string;

	@Expose({ name: 'IRL_NON_VOSA' })
	nonVosa!: string;

	@Expose({ name: 'IRL_FOR_OP_NAT_IND' })
	foreignOpNationalityInd!: string;

	@Expose({ name: 'IRL_DELETION_IND' })
	deletionMarker!: string;
}
