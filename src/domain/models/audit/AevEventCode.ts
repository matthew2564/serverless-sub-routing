import { Expose } from 'class-transformer';

export class AevEventCode {
	@Expose({ name: 'EVENT_CODE' })
	eventCode!: number;

	@Expose({ name: 'EVENT_SHORT_DESCRIPTION' })
	eventShortDescription!: string;

	@Expose({ name: 'EVENT_FULL_DESCRIPTION' })
	eventFullDescription!: string;

	@Expose({ name: 'DELETION_MARKER' })
	deletionMarker!: string;

	@Expose({ name: 'NOTICE_INDICATOR' })
	noticeIndicator!: string;
}
