import defaultController from "./default.controller";

export default class JobStatusController extends defaultController {

	private jobStatus: any;

	constructor(db: any) {
		super();
		this.jobStatus = db.jobStatusRepository;
	}

	async getJobStatuses(jid: number) {
		this.logger.info(`Controller: getJobStatuses(${jid})`, null);
		return await this.jobStatus.findAll({
			where: { jobId: jid }
		}).then(data => {
			console.log('jobStatus:::', data);
			return data;
		}).catch(err => {
			console.log(err);
			return { error: err };
		});
	}

	async createJobStatus(newJobStatus) {
		this.logger.info('Controller: createJobStatus', null);
		return await this.jobStatus.create(newJobStatus)
			.then(data => data)
			.catch(err => {
				console.log(err);
				return { error: err };
			});
	}

	// date may have to change API date format
	async updateJobStatus(jid: number, sid: number, date: any) {
		this.logger.info('Controller: updateJobStatus', null);
		try {

			const toUpdate = {
				updatedAt: new Date(date).toISOString()
			};

			return await this.jobStatus.update(
				toUpdate,
				{ where: { jobId: jid, statusId: sid }}
			)
				.then(data => data)
				.catch(err => {
					console.log(err);
					return { error: err };
				});
			
		} catch (err) {

			if (err instanceof RangeError) {
				err.message = 'bad date format received';
			}
			console.log(err);
			return { error: err };

		}
	}

	async deleteJobStatus(jid: number, sid: number) {
		this.logger.info(`Controller: deleteJobStatus(${jid},${sid})`, null);
		return await this.jobStatus.destroy({
			where: {
				jobId: jid,
				statusId: sid
			}
		}).then(n => {
			console.log(`deleted ${n} row(s)`);
            return n;
        }).catch(err => {
            this.logger.error(err);
            return { error: err };
        });
	}

}