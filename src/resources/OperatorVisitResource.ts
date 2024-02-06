import {JsonController, Get, Res, Post, Body} from 'routing-controllers';
import {Response} from 'express';
import {Inject, Service} from 'typedi';
import {Logger} from '@aws-lambda-powertools/logger';
import {LogLevel} from '@aws-lambda-powertools/logger/lib/types';
import {OperatorVisitService} from '../services/OperatorVisitService';
import {name, version} from '../../package.json';
import {McModel, OperatorVisitRequest} from '../models/McModel';
import {ErrorEnum} from '../enums/Error.enum';
import {ValidateSchema} from "../misc/decorators/JoiDecorator";

@Service()
@JsonController('/1.0/operator')
export class OperatorVisitResource {
    private readonly logger: Logger = new Logger({
        serviceName: name,
        logLevel: (process.env.LOG_LEVEL as LogLevel) || 'info',
    });

    constructor(@Inject() private operatorVisitService: OperatorVisitService) {
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
            this.logger.info(`Calling \`getOperatorVisit\` with body ${body}`);

            const operatorVisitResponse = await this.operatorVisitService.getOperatorVisit(body);

            if (!operatorVisitResponse?.operatorVisitsData.length) {
                return response.status(204).json({});
            }

            this.logger.debug(`${operatorVisitResponse.count} operator visits found.`);

            return response.status(200).json(operatorVisitResponse);
        } catch (err) {
            this.logger.error('[ERROR]: getOperatorVisit', err as Error);

            return response.status(500).send({message: ErrorEnum.INTERNAL_SERVER_ERROR});
        }
    }
}
