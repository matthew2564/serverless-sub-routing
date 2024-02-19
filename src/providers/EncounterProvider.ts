import {Inject, Service} from "typedi";
import {QueryProvider} from "./QueryProvider";
import path from "path";
import {CONNECTION, LOGGER} from "../domain/di-tokens/di-tokens";
import {Connection} from "mysql2";
import {EncounterData} from "../domain/models/encounter/EncounterData";
import {EncounterDetail} from "../domain/models/encounter/EncounterDetail";
import {EncounterAxle} from "../domain/models/encounter/EncounterAxle";
import {Params} from "mybatis-mapper";
import {EncounterNotice} from "../domain/models/encounter/EncounterNotice";
import {EncounterOffence} from "../domain/models/encounter/EncounterOffence";
import {EncounterDefect} from "../domain/models/encounter/EncounterDefect";
import {Logger} from "@aws-lambda-powertools/logger";

@Service()
export class EncounterProvider extends QueryProvider {
    private static readonly MAPPER_PATHS = [
        path.resolve(__dirname, './mappers/EncounterMapper.xml'),
        path.resolve(__dirname, './mappers/EncounterNoticeMapper.xml'),
        path.resolve(__dirname, './mappers/EncounterSearchMapper.xml'),
    ];

    constructor(@Inject(CONNECTION) connection: Connection) {
        super(connection, 'dvsa.mc', EncounterProvider.MAPPER_PATHS);
    }

    async getEncounter(identifier: string, vin: string): Promise<EncounterData[]> {
        // @TODO: Role check - getAllowEncounter

        return this.session.selectList('getEncounterData', {identifier, vin}, EncounterData);
    }

    async getEncounterByIdentifier(identifier: string): Promise<EncounterDetail | null> {
        // @TODO: Role check - getAllowEncounter

        return await this.getEncounterDetails(
            await this.session.selectFirst(
                'getEncounterDetailData',
                {identifier},
                EncounterDetail
            )
        );
    }

    async getEncounterTrailer(identifier: string): Promise<EncounterDetail | null> {
        // @TODO: Role check - getAllowEncounter

        return await this.getEncounterDetails(
            await this.session.selectFirst(
                'getEncounterTrailer',
                {identifier},
                EncounterDetail
            )
        );
    }

    private async getEncounterDetails(encounterDetail: EncounterDetail): Promise<EncounterDetail | null> {
        if (!encounterDetail) return null;

        const params = {...encounterDetail} as unknown as Params;

        // Use Promise.all to run all the top-level queries in parallel as they are not dependent on each other
        // i.e. 'getEncounterAxlesById', 'getEncounterNoticesById', 'getOtherOffencesById'
        //
        // 1. Inside the Promise.all, we use `this.queryCatchAndMapTo` to run the query and map the result to the given model
        // 2. We use `queryCatchAndMapTo` to catch any errors and log them, this stops the error from propagating and
        // stopping the entire process
        // 3. For `getEncounterNoticesById`, if the query is successful, we use Promise.all to run another
        // set of queries in parallel for defects and offences
        const [encounterAxles, encounterNotices, otherOffences] = await Promise.all([
            this.queryCatchAndMapTo('getEncounterAxlesById', params, EncounterAxle),

            this.queryCatchAndMapTo('getEncounterNoticesById', params, EncounterNotice)
                .then((notices) =>
                    Promise.all(notices.map(async (notice) => {
                        const noticeParams = {
                            genNum: notice.noticeGeneratedNumber,
                            noticeType: notice.noticeType,
                            noticeInputDate: notice.noticeInputDate.toString(),
                        };

                        const [encounterDefects, encounterOffences] = await Promise.all([
                            this.queryCatchAndMapTo('getEncounterDefectsById', noticeParams, EncounterDefect),
                            this.queryCatchAndMapTo('getEncounterOffencesById', noticeParams, EncounterOffence),
                        ]);

                        return {...notice, encounterDefects, encounterOffences};
                    }))
                ),

            this.queryCatchAndMapTo('getOtherOffencesById', params, EncounterOffence)
        ]);

        return {
            ...encounterDetail,
            encounterAxles,
            encounterNotices,
            otherOffences,
        };
    }
}
