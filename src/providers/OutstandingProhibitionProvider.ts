import { Container, Service } from 'typedi';
import { SESSION } from '../domain/di-tokens/di-tokens';
import { OutstandingProhibitionData } from '../domain/models/prohibition/OutstandingProhibitionData';

@Service()
export class OutstandingProhibitionProvider {
	private static readonly MECH_PROHIB = /BMVZ01|BMFZ01|BMPZ01/;
	private static readonly OFF_PROHIB = /BOPA01|FOPA01/;
	private static readonly WEIGHT_PROHIB = /BWPZ01|FWPZ01/;

	get session() {
		return Container.get(SESSION);
	}

	async getOutstandingProhibitions(identifier: string): Promise<OutstandingProhibitionData[]> {
		// @TODO: Role check - getAllowCloseProhibition

		const outstandingProhibitionData = await this.session.selectList(
			'getOutstandingProhibition',
			{ identifier },
			OutstandingProhibitionData
		);

		return outstandingProhibitionData.map((outstandingProhibition) => {
			const prohibitionKey = this.getProhibitionKey(outstandingProhibition.noticeCode);

			if (prohibitionKey) outstandingProhibition[prohibitionKey] = 'Y';

			return outstandingProhibition;
		});
	}

	private getProhibitionKey(noticeCode: string) {
		if (OutstandingProhibitionProvider.MECH_PROHIB.test(noticeCode)) {
			return 'outstandingMechanicalProhibition' as const;
		}
		if (OutstandingProhibitionProvider.OFF_PROHIB.test(noticeCode)) {
			return 'outstandingOffenceProhibition' as const;
		}
		if (OutstandingProhibitionProvider.WEIGHT_PROHIB.test(noticeCode)) {
			return 'outstandingOverweightProhibition' as const;
		}
		return null;
	}
}
