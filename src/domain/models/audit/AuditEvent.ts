import { AevEventCode } from './AevEventCode';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Exclude()
export class AuditEvent {
	@Type(() => AevEventCode)
	aevEventCode!: AevEventCode;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY HH:mm:ss'))
	@Expose({ name: 'EVENT_TIMESTAMP' })
	eventTimestamp!: Date;

	@Expose({ name: 'USE_FIRST_NAME' })
	responsibleFirstName!: string;

	@Expose({ name: 'USE_SURNAME' })
	responsibleSurname!: string;

	@Expose({ name: 'USE_USER_ID' })
	responsibleUserId!: string;

	@Expose({ name: 'EVENT_UNIT' })
	eventUnit!: string;

	@Expose({ name: 'FK_AEV_EVENT_CODE' })
	fkAevEventCode?: string;

	@Expose({ name: 'COMMENTS' })
	comments!: string;
}
