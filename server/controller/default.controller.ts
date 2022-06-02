import { APILogger } from "../logger/api.logger";

export default class defaultController {

	protected logger: APILogger;

	constructor() {
		this.logger = new APILogger();
	}

};
