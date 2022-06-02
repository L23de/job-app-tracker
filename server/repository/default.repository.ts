import { Model } from "sequelize-typescript";
import { APILogger } from "../logger/api.logger";

export default class defaultRepository {

	protected logger: APILogger;
	protected db: any = {};
	protected repository: any;

	constructor(db: any, model: typeof Model) {
		this.db = db;
		const force = process.env.UPDATE === "true" ? true : false;
		this.db.sequelize.sync({ force: force }).then(() => {
			console.log("Drop and re-sync db");
		});
		this.repository = this.db.sequelize.getRepository(model);
	}

}