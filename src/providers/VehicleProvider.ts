import { Inject, Service } from 'typedi';
import axios, { AxiosResponse } from 'axios';
import { VehicleData } from '../models/VehicleDataModel';
import { SecretModel } from '../models/SecretModel';
import { SECRET } from '../repository/di-tokens';

@Service()
export class VehicleProvider {
	constructor(@Inject(SECRET) private secret: SecretModel) {}

	async getVehicleByVrm(identifier: string): Promise<AxiosResponse<VehicleData>> {
		return axios.post<VehicleData>(
			this.secret.dvlaUrl,
			{
				registrationNumber: identifier,
			},
			{
				headers: {
					'x-api-key': this.secret.dvlaApiKey,
					'Content-Type': 'application/json',
				},
			}
		);
	}
}
