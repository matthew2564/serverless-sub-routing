import { ObservedDriverData } from '../driver/ObservedDriverData';
import { ObservedEncounterData } from '../driver/ObservedEncounterData';
import { EncounterData } from '../encounter/EncounterData';

export class DriverEncounterResponse {
	timeStamp!: string;
	count!: number;
	drivers!: ObservedDriverData[];
	observedEncounters!: ObservedEncounterData[];
	encounters!: EncounterData[];
}
