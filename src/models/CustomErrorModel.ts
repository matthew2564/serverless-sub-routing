export interface CustomErrorModel {
	status: string;
	code: string;
	title: string;
	detail: string;
}

export class CustomError {
	private static detail: string;
	private static status: string;
	private static title: string;

	constructor(responseError: CustomErrorModel) {
		CustomError.detail = responseError.detail;
		CustomError.status = responseError.status;
		CustomError.title = responseError.title;
	}

	static get error() {
		return {
			detail: this.detail,
			status: Number(this.status),
			title: this.title,
		};
	}
}
