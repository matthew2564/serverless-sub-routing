import { OperatorVisitData } from '../operator/OperatorVisitData';

export class OperatorVisitResponse {
	timeStamp: string | undefined;
	count!: number;
	operatorVisitsData!: OperatorVisitData[];
}
