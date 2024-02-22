import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterJourney {
	@Expose({ name: 'GOODS_CARRIED' })
	goodsCarried!: string;

	@Expose({ name: 'FORENAME' })
	firstName!: string;

	@Expose({ name: 'SURNAME' })
	lastName!: string;

	@Expose({ name: 'TRADING_AS' })
	tradingAs!: string;

	@Expose({ name: 'ADDR_1' })
	addressLine1!: string;

	@Expose({ name: 'ADDR_2' })
	addressLine2!: string;

	@Expose({ name: 'ADDR_3' })
	addressLine3!: string;

	@Expose({ name: 'ADDR_4' })
	addressLine4!: string;

	@Expose({ name: 'POST_TOWN' })
	postTown!: string;

	@Expose({ name: 'CON_POSTCODE' })
	postcode!: string;

	@Expose({ name: 'JOURNEY_START_LCTN' })
	journeyStartLocation!: string;

	@Expose({ name: 'JOURNEY_END_LOCATN' })
	journeyEndLocation!: string;
}
