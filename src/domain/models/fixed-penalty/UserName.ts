import { Expose } from 'class-transformer';

export class UserName {
	@Expose({ name: 'NAME' })
	username!: string;
}
