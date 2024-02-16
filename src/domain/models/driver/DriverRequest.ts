import { IsOptional, Length, Matches } from 'class-validator';

export class DriverRequest {
	@Length(1, 37, { message: 'The length of the field must be between 1 and 37 characters' })
	@IsOptional()
	forename!: string;

	@Length(1, 42, { message: 'The length of the field must be between 1 and 42 characters' })
	@IsOptional()
	surname!: string;

	@Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'The date of birth must be in the format YYYY-MM-DD' })
	@IsOptional()
	dateOfBirth!: string;

	@Length(1, 60, { message: 'The length of the field must be between 1 and 60 characters' })
	@IsOptional()
	address?: string;

	@Length(1, 16, { message: 'The length of the field must be between 1 and 16 characters' })
	@IsOptional()
	licenceNo?: string;

	@Length(1, 1, { message: 'The length of the field must be 1 character' })
	@IsOptional()
	dobFlag!: string;
}
