import { JsonInclude } from '../../decorators/JsonInclude';
import { Transform } from 'class-transformer';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@JsonInclude()
export class OperatorVisitRequest {
	clientGuid?: string;
	operatorLicenceNumber?: string;
	visitType?: string;

	@Transform(({ value }) => (value ? DateTime.at(value).format('YYYY-MM-DD HH:mm:ss') : null))
	fromDate?: string;

	@Transform(({ value }) => (value ? DateTime.at(value).format('YYYY-MM-DD HH:mm:ss') : null))
	toDate?: string;
}
