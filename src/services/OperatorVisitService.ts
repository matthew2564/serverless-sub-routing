import {Inject, Service} from 'typedi';
import {OperatorVisitProvider} from '../providers/OperatorVisitProvider';
import {OperatorVisitRequest} from '../models/McModel';
import {OperatorVisitData} from "../models/OperatorVisitDataModel";
import {OperatorVisitResponseModel} from "../models/OperatorVisitResponseModel";

@Service()
export class OperatorVisitService {
    constructor(@Inject() private operatorVisitProvider: OperatorVisitProvider) {
        this.operatorVisitProvider = operatorVisitProvider;
    }

    async getOperatorVisit(operatorVisitRequest: OperatorVisitRequest): Promise<OperatorVisitResponseModel> {
        const operatorVisitData = await this.operatorVisitProvider.getOperatorVisit(operatorVisitRequest);

        const opVisitsWithEncounters = await Promise.all(operatorVisitData.map(async (visit) => {
            // Asynchronously get vehicle encounters for each visit and set the clientGuid for each encounter
            const opVehicleEncounters = await this.operatorVisitProvider.getOperatorVehicleEncounter(visit);

            // Return a new visit object with the updated vehicle encounters
            return {
                ...visit,
                vehicleEncounters: opVehicleEncounters.map((encounter) => ({
                    ...encounter,
                    clientGuid: visit.clientGuid as string,
                })),
            } satisfies OperatorVisitData;
        }));

        return {
            timeStamp: new Date().toISOString(),
            count: opVisitsWithEncounters.length,
            operatorVisitsData: opVisitsWithEncounters,
        };
    }
}
