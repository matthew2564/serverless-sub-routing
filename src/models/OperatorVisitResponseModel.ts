import {OperatorVisitData} from "./OperatorVisitDataModel";

export class OperatorVisitResponseModel {
    timeStamp: string | undefined;
    count!: number;
    operatorVisitsData!: OperatorVisitData[];
}
