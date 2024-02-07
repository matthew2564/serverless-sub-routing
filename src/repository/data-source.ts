import 'reflect-metadata';
import { DataSource } from 'typeorm';
// import {SECRETS_MANAGER} from "./di-tokens";
// import {Inject} from "typedi";
// import {Secret} from "../models/Secret";
// import { ApiList } from '../model/api-list';
// import { Execution } from '../model/execution';
// import { Result } from '../model/result';

export const Connection = new DataSource({
    type: 'mysql',
    host: 'bastion.dev-ctrl.smc.dvsacloud.uk',
    port: 3306,
    username: 'master',
    password: 'auroranonprodmasterpasswordchangeme',
    database: 'mc_owner',
    synchronize: false,
    logging: false,
    // entities: [ApiList, Execution, Result],
    migrations: [],
    subscribers: [],
});
