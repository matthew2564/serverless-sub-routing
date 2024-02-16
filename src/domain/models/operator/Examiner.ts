import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class Examiner {
	@Expose({ name: 'FIRST_NAME' })
	firstName!: string;

	@Expose({ name: 'SURNAME' })
	surname!: string;

	@Expose({ name: 'USER_ID' })
	userId!: string;
}
