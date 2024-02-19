import { Expose } from 'class-transformer';

export class EncounterDefect {
    @Expose({ name: 'S_MARK' })
    sMark!: string;

    @Expose({ name: 'DEFECT_CODE' })
    defectCode!: string;

    @Expose({ name: 'IM_NUM' })
    imNum!: string;

    @Expose({ name: 'SEVERITY' })
    severity!: string;

    @Expose({ name: 'ACTUAL_ACTION' })
    actualAction!: string;

    @Expose({ name: 'PART_MAKE' })
    partMake!: string;

    @Expose({ name: 'ADF_SIZE' })
    size!: string;

    @Expose({ name: 'SERIAL_NUMBER' })
    serialNumber!: string;

    @Expose({ name: 'AXLE_NUMBER' })
    axleNumber!: string;

    @Expose({ name: 'ADF_SIDE' })
    side!: string;

    @Expose({ name: 'POSITION_ON_AXLE' })
    positionOnAxle!: string;

    @Expose({ name: 'ADF_END' })
    end!: string;

    @Expose({ name: 'VERTICAL_POSITION' })
    verticalPosition!: string;

    @Expose({ name: 'ADDITIONAL_TEXT' })
    additionalText!: string;

    @Expose({ name: 'DESC_TEXT' })
    descriptionText!: string;

    @Expose({ name: 'DESCRIPTION' })
    description!: string;

    @Expose({ name: 'DETAILED_DESCRIPTION' })
    detailedDescription!: string;
}
