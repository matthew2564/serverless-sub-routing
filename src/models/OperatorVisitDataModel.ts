import { Expose, Type } from "class-transformer";
import {IsDateString, IsNotEmpty, IsString } from "class-validator";

interface Examiner {
    firstName: string;
    surname: string;
    userId: string;
}

interface InitiatingReason {
    generatedNumber: number;
    description: string;
    deletionMarker: string;
    sequenceNumber: number;
    usage: string;
}

interface VeVisitResult {
    code: string;
    description: string;
    deletionMarker: string;
    sequenceNumber: number;
}

interface TeHoursResult {
    code: string;
    description: string;
    deletionMarker: string;
    sequenceNumber: number;
}

interface TeOtherResult {
    code: string;
    description: string;
    deletionMarker: string;
    sequenceNumber: number;
}

export class OperatorVisitVehicleEncounter {
    @Expose({ name: 'encounterGeneratedNumber' })
    @IsNotEmpty()
    @IsString()
    encounterGeneratedNumber!: string;

    @Expose({ name: 'fasGeneratedNumber' })
    @IsNotEmpty()
    @IsString()
    fasGeneratedNumber!: string;

    @Expose({ name: 'encounterStartDate' })
    @Type(() => Date)
    @IsDateString()
    encounterStartDate!: Date;

    @Expose({ name: 'clientGuid' })
    @IsNotEmpty()
    @IsString()
    clientGuid!: string;

    @Expose({ name: 'rteVehicleId' })
    @IsNotEmpty()
    @IsString()
    rteVehicleId!: string;

    @Expose({ name: 'examiner' })
    @IsNotEmpty()
    @IsString()
    examiner!: string;

    @Expose({ name: 'vehInspectionResult' })
    @IsNotEmpty()
    @IsString()
    vehInspectionResult!: string;
}

export interface OperatorVisitData {
    generatedNumber: string;
    fasStatus?: string; // Optional property
    actualStartDate: Date;
    actualEndDate: Date;
    operatorLicenceNumber: string;
    examiner: Examiner;
    clientGuid?: string; // Optional property
    lastUpdate: Date;
    visitType: string;
    inputTime: Date;
    chrNumber?: string; // Optional property
    operatorName?: string; // Optional property
    initiatingReason: InitiatingReason;
    addressLine1?: string; // Optional property
    addressLine2?: string; // Optional property
    addressLine3?: string; // Optional property
    addressLine4?: string; // Optional property
    postcode?: string; // Optional property
    postTown?: string; // Optional property
    veVisitResult: VeVisitResult;
    digitalTachoQty: number;
    paperTachoQty: number;
    teHoursResult: TeHoursResult;
    teOtherResult: TeOtherResult;
    vehicleEncounters: OperatorVisitVehicleEncounter[];
}
