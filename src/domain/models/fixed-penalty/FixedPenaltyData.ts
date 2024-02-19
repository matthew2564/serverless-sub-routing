import { Expose } from 'class-transformer';

export class FixedPenaltyData {
    @Expose({ name: 'ENCOUNTER_IDENTIFIER' }) encounterIdentifier!: string;
    @Expose({ name: 'VEHICLE_ID' }) vehicleId: string;
    @Expose({ name: 'NOTICE_REFERENCE' }) noticeReference: string;
    @Expose({ name: 'LICENCE_COLLECTION_STATUS' }) licenceCollectionStatus: string;
    @Expose({ name: 'ENDORSABLE_FLAG' }) endorsableFlag: string;
    @Expose({ name: 'AMOUNT_DUE' }) amountDue: number;
    @Expose({ name: 'PNO_POINTS' }) points: number;
    @Expose({ name: 'PNO_PAYMENT_DUE_DATE' }) paymentDueDate: Date;
    @Expose({ name: 'PAYMENT_STATUS' }) noticePaymentStatus: string;
    @Expose({ name: 'DRIVER_TYPE' }) source: string;
    @Expose({ name: 'FORENAME' }) forename: string;
    @Expose({ name: 'SURNAME' }) surname: string;
    @Expose({ name: 'DATE_OF_BIRTH' }) dateOfBirth: Date;
    @Expose({ name: 'BIRTH_PLACE' }) birthPlace: string;
    @Expose({ name: 'DRIVER_DETAILS_ORIGIN_CODE' }) driverDetailsOrigin: number;
    @Expose({ name: 'ORIGIN_DESCRIPTION' }) driverDetailsOriginCode: string;
    @Expose({ name: 'DRIVER_LIC_NUM' }) licenceNo: string;
    @Expose({ name: 'REG_KEEPER_INDICTR' }) isKeeper: string;
    @Expose({ name: 'SEX' }) sex: string;
    @Expose({ name: 'IRL_CODE' }) issuingNation: string;
    @Expose({ name: 'IRL_COUNTRY' }) issuingCountry: string;
    @Expose({ name: 'CATEGORY_CODE' }) licenceCategory: string;
    @Expose({ name: 'LICENCE_TYPE_CODE' }) licenceType: string;
    @Expose({ name: 'LICENCE_TYPE_DESCRIPTION' }) licenceTypeCode: string;
    @Expose({ name: 'LICENCE_ISSUE_NO' }) issueNumber: string;
    @Expose({ name: 'PNO_REFERRED_DATE' }) issueDate: Date;
    @Expose({ name: 'PASSPORT_NUMBER' }) passportNumber: string;
    @Expose({ name: 'ADDR_1' }) address: string;
    @Expose({ name: 'ADDR_2' }) addr2: string;
    @Expose({ name: 'ADDR_3' }) addressLine3: string;
    @Expose({ name: 'ADDR_4' }) addressLine4: string;
    @Expose({ name: 'POSTOWN' }) postTown: string;
    @Expose({ name: 'POSTCODE' }) postCode: string;
    @Expose({ name: 'UK_RESIDENT' }) ukResident: string;
    // ExaminerId and other properties can be added similarly
}
