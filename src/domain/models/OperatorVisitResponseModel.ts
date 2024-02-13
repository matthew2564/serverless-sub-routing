import { OperatorVisitMap } from './OperatorVistitMapModel';

export class OperatorVisitResponseModel {
	timeStamp: string | undefined;
	count!: number;
	operatorVisitsData!: OperatorVisitMap[];
}
