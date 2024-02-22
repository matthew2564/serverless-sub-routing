import { FixedPenaltyData } from '../fixed-penalty/FixedPenaltyData';

export class FixedPenaltyResponse {
	timeStamp!: string;
	fixedPenaltyDetails!: FixedPenaltyData[];
}
