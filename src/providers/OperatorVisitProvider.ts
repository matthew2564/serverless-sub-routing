import {Inject, Service} from 'typedi';
import {OperatorVisitData, OperatorVisitVehicleEncounter} from "../models/OperatorVisitDataModel";
import {OperatorVisitRequest} from "../models/McModel";
import {SESSION} from "../repository/di-tokens";
import {DataSource, Repository} from "typeorm";

@Service()
export class OperatorVisitProvider {
	private operatorVisit: Repository<OperatorVisit>;

	constructor(@Inject(SESSION) session: DataSource) {
		this.operatorVisit = session.getRepository(OperatorVisit);
	}

	async getOperatorVisit(operatorVisitRequest: OperatorVisitRequest) {
		try {
			let queryBuilder = this.operatorVisit
				.createQueryBuilder('operatorVisit')
				.select([
					'operatorVisit.generatedNumber',
					'operatorVisit.fasStatus',
					'operatorVisit.actualStartDate'
				]);

			// queryBuilder
			// 	.leftJoinAndSelect('operatorVisit.initiatingReason', 'initiatingReason')
			// 	.leftJoinAndSelect('operatorVisit.teHoursResult', 'teHoursResult')
			// 	.leftJoinAndSelect('operatorVisit.teOtherResult', 'teOtherResult')
			// 	.leftJoinAndSelect('operatorVisit.veVisitResult', 'veVisitResult')
			//
			// if (operatorVisitRequest.operatorLicenceNumber) {
			// 	queryBuilder = queryBuilder.andWhere('operatorVisit.operatorLicenceNumber = :operatorLicenceNumber', { operatorLicenceNumber: operatorVisitRequest.operatorLicenceNumber });
			// }
			//
			// if (operatorVisitRequest.clientGuid) {
			// 	queryBuilder = queryBuilder.andWhere('operatorVisit.clientGuid = :clientGuid', { clientGuid: operatorVisitRequest.clientGuid });
			// }
			//
			// if (operatorVisitRequest.visitType) {
			// 	queryBuilder = queryBuilder.andWhere('operatorVisit.visitType = :visitType', { visitType: operatorVisitRequest.visitType });
			// }
			//
			// if (operatorVisitRequest.fromDate) {
			// 	queryBuilder = queryBuilder.andWhere('operatorVisit.actualStartDate >= :fromDate', { fromDate: operatorVisitRequest.fromDate });
			// }
			//
			// if (operatorVisitRequest.toDate) {
			// 	queryBuilder = queryBuilder.andWhere('operatorVisit.actualStartDate <= :toDate', { toDate: operatorVisitRequest.toDate });
			// }
			//
			// queryBuilder = queryBuilder.orderBy('operatorVisit.actualStartDate', 'DESC');

			return await queryBuilder.getMany();
		} catch (err) {
			throw err;
		}
	}

	async getOperatorVehicleEncounter(operatorVisitsData: OperatorVisitData): Promise<OperatorVisitVehicleEncounter[]> {
		if (operatorVisitsData.generatedNumber !== null) {
			// do something here
			return [];
		}
		return [];
	}
}
