import { EncounterCopyFpnFixedPenalty } from './EncounterCopyFpnFixedPenalty';
import { Exclude, Expose, Transform } from 'class-transformer';
import { plainToInstanceOrNull } from '../../../helpers/MapModelOrNull';

@Exclude()
export class EncounterCopyFpnOffenceDetail {
	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyFpnFixedPenalty, obj))
	@Expose({ name: '' })
	fixedPenalty!: EncounterCopyFpnFixedPenalty;
}
