import { IsOptional, Length, Matches } from 'class-validator';

export class EncounterRequest {
	@IsOptional()
	@Length(1, 21, { message: 'The length of the field must be between 1 and 21 characters' })
	vrm!: string;

	@IsOptional()
	@Length(1, 25, { message: 'The length of the field must be between 1 and 25 characters' })
	licenceNo!: string;

	@IsOptional()
	@Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'The start date must be in the format YYYY-MM-DD' })
	startDate!: string;

	@IsOptional()
	@Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'The end date must be in the format YYYY-MM-DD' })
	endDate!: string;

	@IsOptional()
	@Length(1, 10, { message: 'The length of the field must be between 1 and 10 characters' })
	locationId!: string;

	@IsOptional()
	@Length(1, 25, { message: 'The length of the field must be between 1 and 25 characters' })
	firstName!: string;

	@IsOptional()
	@Length(1, 35, { message: 'The length of the field must be between 1 and 35 characters' })
	lastName!: string;

	@IsOptional()
	@Length(1, 1, { message: 'The length of the field must be 1 character' })
	sanction!: string;

	@IsOptional()
	@Length(1, 38, { message: 'The length of the field must be between 1 and 38 characters' })
	driverFirstName!: string;

	@IsOptional()
	@Length(1, 43, { message: 'The length of the field must be between 1 and 43 characters' })
	driverLastName!: string;

	@IsOptional()
	endorsableFlag!: string;
}
