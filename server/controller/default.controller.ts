import { APILogger } from "../logger/api.logger";

export default class defaultController {

	protected logger: APILogger;
	protected repository: any;

	constructor() {
		this.logger = new APILogger();
	}

};
