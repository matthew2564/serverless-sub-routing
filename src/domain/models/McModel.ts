import Joi from 'joi';
import { Transform } from 'class-transformer';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';
import { JsonInclude } from '../decorators/JsonInclude';

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

export class McModel {
	static readonly OperatorVisit = Joi.object<OperatorVisitRequest>({
		clientGuid: Joi.string().optional(),
		operatorLicenceNumber: Joi.string().optional(),
		fromDate: Joi.string().optional(),
		toDate: Joi.string().optional(),
		visitType: Joi.string().optional(),
	})
		// Ensure one and only one is present
		.xor('clientGuid', 'operatorLicenceNumber')
		// If operatorLicenceNumber is present, fromDate and toDate must be present
		.with('operatorLicenceNumber', ['fromDate', 'toDate'])
		.when(Joi.object({ clientGuid: Joi.exist() }).unknown(), {
			then: Joi.object({
				fromDate: Joi.optional(),
				toDate: Joi.optional(),
				visitType: Joi.optional(),
			}),
		});
}
