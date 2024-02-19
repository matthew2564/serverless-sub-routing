import {EncounterData} from "../encounter/EncounterData";

export class EncounterResponse {
    timeStamp!: string;
    encounters!: EncounterData[];
}
