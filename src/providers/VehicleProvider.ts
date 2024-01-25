import { Service } from 'typedi';
import axios, { AxiosResponse } from 'axios';
import { SecretsManager } from '@dvsa/cvs-microservice-common/classes/aws/secrets-manager-client';
import { EnvironmentVariables } from '@dvsa/cvs-microservice-common/classes/misc/env-vars';
import { VehicleData } from '../models/VehicleDataModel';
import { SecretModel } from '../models/SecretModel';

@Service()
export class VehicleProvider {
	async getVehicleByVrm(identifier: string): Promise<AxiosResponse<VehicleData>> {
		const secret = await SecretsManager.get<SecretModel>({
			SecretId: EnvironmentVariables.get('secretkey'),
		});

		return axios.post<VehicleData>(
			secret.dvlaUrl,
			{
				registrationNumber: identifier,
			},
			{
				headers: {
					'x-api-key': secret.dvlaApiKey,
					'Content-Type': 'application/json',
				},
			}
		);
	}
}
