import { APILogger } from "../logger/api.logger";
import * as Models from "../model";
import defaultRepository from "./default.repository";

export default class UserRepository extends defaultRepository {

	constructor(db: any) {
		super(db, Models.User);
	}

	async getUsers() {
		await this.repository.findAll()
			.then((users) => {
				console.log('users:::', users);
				return users;
			})
			.catch((err) => {
				console.log(err);
				return [];
			});
	}

	async createUser(user) {
		await this.repository.create(user)
			.then(data => data)
			.catch(err => this.logger.error('Error::' + err));
	}

	async deleteUser(userId: number) {
		await this.repository.destroy({
			where: {
				id: userId
			}
		})
		.then(data => data)
		.catch(err => {
			this.logger.error('Error::' + err);
			return {};
		});
	}

};
