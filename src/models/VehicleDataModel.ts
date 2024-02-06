import { IsNotEmpty, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';
import { JsonInclude } from '../misc/decorators/JsonInclude';

@JsonInclude()
export class VehicleData {
	constructor() {}

	co2Emissions!: number;
	colour!: string;
	engineCapacity!: number;
	fuelType!: string;
	make!: string;
	markedForExport!: boolean;
	monthOfFirstRegistration!: string;
	motStatus!: string;
	registrationNumber!: string;
	revenueWeight!: number;
	artEndDate!: string;
	taxStatus!: string;
	typeApproval!: string;
	wheelplan!: string;
	yearOfManufacture!: number;
	euroStatus!: string;
	dateOfLastV5CIssued!: string;
	monthOfFirstDvlaRegistration!: string;
	realDrivingEmissions!: string;

	@Transform(({ value }) => DateTime.at(value).format('YYYY-MM-DD'), { toClassOnly: true })
	motExpiryDate!: Date;

	@Transform(({ value }) => DateTime.at(value).format('YYYY-MM-DD'), { toClassOnly: true })
	taxDueDate!: Date;
}

export class VehicleParams {
	// Validators are applied in bottom-up order i.e. @IsNotEmpty() is applied first, then @Matches()
	// In the resource, I have opted to use `{ validate: { stopAtFirstError: true } }` to stop on first error
	@Matches(/^[A-Za-z0-9]*$/, { message: 'Identifier parameter has illegal values' })
	@IsNotEmpty({ message: 'Identifier parameter must be specified' })
	identifier!: string;
}
