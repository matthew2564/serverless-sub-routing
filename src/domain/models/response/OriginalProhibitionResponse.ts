import { OriginalProhibitionRequest } from '../prohibition/OriginalProhibitionRequest';

export class OriginalProhibitionResponse {
	timeStamp!: string;
	originalProhibitionRequest!: OriginalProhibitionRequest;
	originalProhibitionDate!: string;
	originalProhibitionTime!: string;
}
