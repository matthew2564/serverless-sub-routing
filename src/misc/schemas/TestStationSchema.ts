import Joi from 'joi';
import { ITestStation } from '../../models/TestStation.model';

export class Schemas {
	static readonly testStation: Joi.ObjectSchema<ITestStation> = Joi.object({
		testStationId: Joi.string().required(),
		testStationPNumber: Joi.string().required(),
		testStationStatus: Joi.string()
			.required()
			.valid('pending', 'active', 'suspended', 'termination requested', 'terminated'),
		testStationName: Joi.string().required(),
		testStationContactNumber: Joi.string().required(),
		testStationAccessNotes: Joi.string().allow(null),
		testStationGeneralNotes: Joi.string().allow(null),
		testStationTown: Joi.string().required(),
		testStationAddress: Joi.string().required(),
		testStationPostcode: Joi.string().required(),
		testStationCountry: Joi.string().allow(null),
		testStationLongitude: Joi.number().allow(null),
		testStationLatitude: Joi.number().allow(null),
		testStationType: Joi.string().required().valid('atf', 'tass', 'gvts', 'potf', 'hq', 'other'),
		testStationEmails: Joi.array().items(Joi.string()).required(),
	});
}
