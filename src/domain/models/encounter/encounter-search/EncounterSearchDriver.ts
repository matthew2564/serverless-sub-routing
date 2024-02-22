import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterSearchDriver {
	@Expose({ name: 'DRIVER_TYPE' })
	driverType!: string;

	@Expose({ name: 'FORENAME' })
	driverFirstName!: string;

	@Expose({ name: 'SURNAME' })
	driverLastName!: string;
}
