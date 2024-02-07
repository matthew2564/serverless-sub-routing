import {JsonController, Get, Res, Post, Body} from 'routing-controllers';
import {Response} from 'express';
import {Inject, Service} from 'typedi';
import {Logger} from '@aws-lambda-powertools/logger';
import {OperatorVisitService} from '../services/OperatorVisitService';
import {name, version} from '../../package.json';
import {McModel, OperatorVisitRequest} from '../models/McModel';
import {ErrorEnum} from '../enums/Error.enum';
import {ValidateSchema} from "../misc/decorators/JoiDecorator";
import {LOGGER, SECRETS_MANAGER} from "../repository/di-tokens";
import {Secret} from "../models/Secret";
import {Database} from "../repository/database";
import {Connection} from "../repository/data-source";

@Service()
@JsonController('/1.0/operator')
export class OperatorVisitResource {
    constructor(
        @Inject() private operatorVisitService: OperatorVisitService,
        @Inject(LOGGER) private logger: Logger,
        @Inject(SECRETS_MANAGER) private secret: Secret,
    ) {
        this.operatorVisitService = operatorVisitService;
    }

    @Get('/version')
    getVersion(@Res() response: Response) {
        this.logger.debug(`Version v${version}`);

        return response.status(200).json({version});
    }

    @Post('/visit')
    @ValidateSchema(McModel.OperatorVisit)
    async getOperatorVisit(@Body() body: OperatorVisitRequest, @Res() response: Response) {
        try {
            await Database.initialiseAndRegister(Connection);

            this.logger.info(`Calling \`getOperatorVisit\` with body ${body}`);

            const operatorVisitResponse = await this.operatorVisitService.getOperatorVisit(body);

            this.logger.debug(`${operatorVisitResponse.count} operator visits found.`);

            if (!operatorVisitResponse?.operatorVisitsData.length) {
                return response.status(204).json({});
            }

            return response.status(200).json(operatorVisitResponse);
        } catch (err) {
            this.logger.error('[ERROR]: getOperatorVisit', err as Error);

            return response.status(500).send({message: ErrorEnum.INTERNAL_SERVER_ERROR});
        }
        finally {
            await Database.closeConnection();
        }
    }
}
