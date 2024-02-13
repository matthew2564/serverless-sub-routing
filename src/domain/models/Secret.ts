export interface Secret {
	dbConnection: string;
	username: string;
	password: string;
	target: string;
	encounterRole: string;
	driverEncounterRole: string;
	closeProhibitionRole: string;

	host?: string;
}
