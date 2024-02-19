import {Inject, Service} from "typedi";
import {QueryProvider} from "./QueryProvider";
import path from "path";
import {CONNECTION} from "../domain/di-tokens/di-tokens";
import {Connection} from "mysql2";

@Service()
export class FixedPenaltyProvider extends QueryProvider {
    private static readonly MAPPER_PATHS = [path.resolve(__dirname, './mappers/FixedPenaltyMapper.xml')];

    constructor(@Inject(CONNECTION) connection: Connection) {
        super(connection, 'dvsa.mc', FixedPenaltyProvider.MAPPER_PATHS);
    }

    async getFixedPenalties(identifier: string) {
        // @TODO: Role check - getAllowEncounter

        return this.session.selectList('getFixedPenalties', { identifier }, class X {});
    }
}
