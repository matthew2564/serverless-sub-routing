import { Service } from 'typedi';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';
import { friendlyName, version } from '../../../package.json';

@Service()
export class VersionService {
	getVersion() {
		return {
			name: friendlyName,
			buildDateTime: new DateTime().format('DD/MM/YYYY HH:mm'),
			version: version,
		};
	}
}
