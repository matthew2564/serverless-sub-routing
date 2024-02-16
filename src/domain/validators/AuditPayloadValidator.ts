import { IsNotEmpty, Matches } from 'class-validator';

export class AuditPayloadValidator {
	@Matches(/^[A-Za-z0-9]*$/, { message: 'Identifier parameter has illegal values' })
	@IsNotEmpty({ message: 'Identifier parameter must be specified' })
	identifier!: string;
}
