export interface Defect {
	id: number;
	additionalInfo: AdditionalInfo;
	forVehicleType: string[];
	imDescription: string;
	imDescriptionWelsh: string;
	imNumber: number;
	items: Item[];
}

export interface AdditionalInfo {
	hgv: Hgv;
	psv: Psv;
	trl: Trl;
}

export interface Hgv {}

export interface Psv {
	location: Location;
	notes: boolean;
}

export interface Location {
	axleNumber: any;
	horizontal: any;
	lateral: any;
	longitudinal: string[];
	rowNumber: any;
	seatNumber: any;
	vertical: any;
}

export interface Trl {}

export interface Item {
	deficiencies: Deficiency[];
	forVehicleType: string[];
	itemDescription: string;
	itemDescriptionWelsh: string;
	itemNumber: number;
}

export interface Deficiency {
	deficiencyCategory: string;
	deficiencyId: string;
	deficiencySubId?: string;
	deficiencyText: string;
	deficiencyTextWelsh: string;
	forVehicleType: string[];
	ref: string;
	stdForProhibition: boolean;
}
