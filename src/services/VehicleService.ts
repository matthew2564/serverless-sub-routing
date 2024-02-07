import { Inject, Service } from 'typedi';
import { VehicleProvider } from '../providers/VehicleProvider';
import { VehicleData } from '../models/VehicleDataModel';
import { plainToInstance } from 'class-transformer';
import { AxiosError } from 'axios';
import { InternalServerError } from 'routing-controllers';
import { HttpStatus } from '@dvsa/cvs-microservice-common/api/http-status-codes';
import { CustomErrorModel, CustomError } from '../models/CustomErrorModel';

@Service()
export class VehicleService {
	constructor(@Inject() private vehicleProvider: VehicleProvider) {
		this.vehicleProvider = vehicleProvider;
	}

	async searchByVrm(identifier: string): Promise<VehicleData> {
		try {
			const response = await this.vehicleProvider.getVehicleByVrm(identifier);

			// attempt to convert the `response.data` to an instance of the `VehicleData` class
			return plainToInstance(VehicleData, response.data);
		} catch (err) {
			const axiosErr = err as AxiosError;

			if (
				axiosErr instanceof AxiosError &&
				(axiosErr.response?.status === HttpStatus.BAD_REQUEST || axiosErr.response?.status === HttpStatus.NOT_FOUND)
			) {
				const {
					errors: [firstError],
				} = axiosErr.response?.data as { errors: CustomErrorModel[] };
				throw new CustomError(firstError);
			}

			const error = err instanceof Error ? err.message : JSON.stringify(err);

			throw new InternalServerError(`Internal server error: Error: ${error}`);
		}
	}
}
