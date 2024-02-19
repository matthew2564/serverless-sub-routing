import { Expose, Type } from 'class-transformer';
import {EncounterDefect} from "./EncounterDefect";
import {EncounterOffence} from "./EncounterOffence";

export class EncounterNotice {
    @Expose({ name: 'PROHIBITION_NOTICE' })
    prohibitionNotice!: string;

    @Expose({ name: 'PROHIBITION_OUTSTANDING' })
    prohibitionOutstanding!: string;

    @Expose({ name: 'NOTICE_TYPE' })
    noticeType!: string;

    @Expose({ name: 'RAW_NOTICE_TYPE' })
    rawNoticeType!: string;

    @Expose({ name: 'NOTICE_DESCRIPTION' })
    noticeDescription!: string;

    @Expose({ name: 'IMMEDIATE_IND' })
    immediateInd!: string;

    @Expose({ name: 'NOTICE_IN_FORCE_DATE' })
    @Type(() => Date)
    inForceDate!: Date;

    @Expose({ name: 'CLEARANCE_DATE' })
    @Type(() => Date)
    clearanceDate!: Date;

    @Expose({ name: 'RECEIVED_BY_FORENME' })
    driverForename!: string;

    @Expose({ name: 'RECEIVED_BY_SURNAME' })
    driverSurname!: string;

    @Expose({ name: 'TACHO_LAST_CLBRTN_DATE' })
    @Type(() => Date)
    dateOfLastTachoInsp!: Date;

    @Expose({ name: 'TACHO_INSPECTION_DUE_DATE' })
    @Type(() => Date)
    dateOfNextTachoInsp!: Date;

    @Expose({ name: 'DANGER_GOODS_DIRECTION' })
    directionConditions!: string;

    @Expose({ name: 'IMMEDIATE_PROHIBITION' })
    immediateProhibition!: string;

    @Expose({ name: 'DEFERRAL_PERIOD' })
    deferralPeriod!: string;

    @Expose({ name: 'NOTICE_VEH_GEN_NUM' })
    noticeGeneratedNumber!: string;

    @Expose({ name: 'NOTICE_INPUT_DATE' })
    @Type(() => Date)
    noticeInputDate!: Date;

    @Type(() => EncounterDefect)
    encounterDefects!: EncounterDefect[];

    @Type(() => EncounterOffence)
    encounterOffences!: EncounterOffence[];
}
