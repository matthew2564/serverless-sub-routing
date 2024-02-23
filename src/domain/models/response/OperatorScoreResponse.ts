import { OperatorScoreData } from '../operator/OperatorScoreData';

export class OperatorScoreResponse {
	timeStamp!: string;
	count!: number;
	operatorScores!: OperatorScoreData[];
}
