import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { OCRSSnapshot } from '../../operator/OCRSSnapshot';
import { EncounterCopyNationality } from './EncounterCopyNationality';
import { EncounterCopyOpLicenceType } from './EncounterCopyOpLicenceType';
import { EncounterCopyOperatorLicenceStatus } from './EncounterCopyOperatorLicenceStatus';
import { plainToInstanceOrNull } from '../../../helpers/MapModelOrNull';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Exclude()
export class EncounterOperator {
	@Expose({ name: 'GEN_NUM' })
	@Exclude({ toPlainOnly: true }) // Exclude when converting class instances to plain objects
	genNum?: string;

	@Type(() => EncounterCopyNationality)
	operatorNationality!: EncounterCopyNationality;

	@Expose({ name: 'OPERATOR_NAME' })
	operatorName!: string;

	@Exclude()
	@Expose({ name: 'NATIONALITY_CODE' })
	nationalityCode!: string;

	@Expose({ name: 'OPERATOR_ADDR_1' })
	addressLine1!: string;

	@Expose({ name: 'OPERATOR_ADDR_2' })
	addressLine2!: string;

	@Expose({ name: 'OPERATOR_ADDR_3' })
	addressLine3!: string;

	@Expose({ name: 'OPERATOR_ADDR_4' })
	addressLine4!: string;

	@Expose({ name: 'OPERATOR_POST_TOWN' })
	postTown!: string;

	@Expose({ name: 'OPERATOR_POST_CODE' })
	postcode!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyNationality, obj))
	@Expose({ name: '' })
	operatorCountry!: EncounterCopyNationality;

	@Expose({ name: 'OPERATOR_TRADING_AS' })
	tradingAs!: string;

	@Expose({ name: 'OPERATOR_LICENCE_NUMBER' })
	licenceNumber!: string;

	@Expose({ name: 'SERIAL_NUMBER' })
	licenceSerialNumber!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyOpLicenceType, obj))
	@Expose({ name: '' })
	licenceTypeCode!: EncounterCopyOpLicenceType;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyOperatorLicenceStatus, obj))
	@Expose({ name: '' })
	stateOfOpDisc!: EncounterCopyOperatorLicenceStatus;

	@Transform(({ value }) => (value ? DateTime.at(value).format('DD/MM/YYYY HH:mm:ss') : null))
	@Expose({ name: 'OPERATOR_EXPIRY_DATE' })
	licenceReviewDate!: string;

	@Type(() => OCRSSnapshot)
	ocrs!: OCRSSnapshot[];
}
