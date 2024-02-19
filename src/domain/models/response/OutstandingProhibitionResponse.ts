import {OutstandingProhibitionData} from "../prohibition/OutstandingProhibitionData";

export class OutstandingProhibitionResponse {
    timeStamp!: string;
    outstandingProhibitions!: OutstandingProhibitionData[];
}
