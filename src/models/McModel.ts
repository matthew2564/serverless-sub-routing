import Joi from 'joi';

export interface OperatorVisitRequest {
	clientGuid?: string;
	operatorLicenceNumber?: string;
	fromDate?: Date;
	toDate?: Date;
	visitType?: string;
}

export class McModel {
	static readonly OperatorVisit = Joi.object<OperatorVisitRequest>({
		clientGuid: Joi.string().optional(),
		operatorLicenceNumber: Joi.string().optional(),
		fromDate: Joi.date().optional(),
		toDate: Joi.date().optional(),
		visitType: Joi.string().optional(),
	}).xor('clientGuid', 'operatorLicenceNumber') // Ensure one and only one is present
		.with('operatorLicenceNumber', ['fromDate', 'toDate']) // If operatorLicenceNumber is present, fromDate and toDate must be present
		.when(Joi.object({ clientGuid: Joi.exist() }).unknown(), {
			then: Joi.object({
				fromDate: Joi.optional(),
				toDate: Joi.optional(),
				visitType: Joi.optional(),
			}),
		})
}
