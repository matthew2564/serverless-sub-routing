export class CustomError {
	name: string = 'CustomError';
	message: string;
	statusCode: number;

	constructor(message: string, statusCode: number) {
		this.message = message;
		this.statusCode = statusCode;
	}
}
