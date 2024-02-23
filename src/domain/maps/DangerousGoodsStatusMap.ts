import { EncounterDangerousGoodsQuestions } from '../models/encounter/encounter-copy/EncounterDangerousGoodsQuestions';

export const DangerousGoodsStatusMap = new Map<string, keyof EncounterDangerousGoodsQuestions>([
	['22', 'Transportdocument_22'],
	['23', 'Instructionsinwriting_23'],
	['24', 'Bilateralmultilateralagreementnationalauthorisation_24'],
	['25', 'Certificateofapprovalforvehicles_25'],
	['26', 'Driverstrainingcertificate_26'],
	['27', 'Goodsauthorisedfortransport_27'],
	['28', 'Vehicleauthorisedforgoodscarried_28'],
	['29', 'Provisionsrelatedtothemodeoftransportbulkpackagetank_29'],
	['30', 'Mixedloadingprohibition_30'],
	['31', 'Loadingsecuringoftheloadandhandling2_31'],
	['32', 'Leakageofgoodsordamagetopackage2_32'],
	['33', 'UNpackagemarkingtankmarking12ADR6_33'],
	['34', 'PackagemarkingegUNnoandlabelling1ADR52_34'],
	['35', 'TankvehicleplacardingADR531_35'],
	['36', 'VehicletransportunitmarkingorangeplateelevtempADR5323_36'],
	['37', 'GeneralPurposesafetyequipmentspecifiedinADR_37'],
	['38', 'Equipmentaccordingtothegoodscarried_38'],
	['39', 'Otherequipmentspecifiedintheinstructionsinwriting_39'],
	['40', 'Fireextinguishers_40'],
]);
