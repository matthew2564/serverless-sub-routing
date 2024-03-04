import { DefectDetailsSchema } from '@dvsa/cvs-type-definitions/types/v1/defect-details';

export type DefectSchemaWithId = DefectDetailsSchema & { id: number };
