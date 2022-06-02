import { Table, Column, Model, DataType, HasMany, BelongsToMany, ForeignKey, PrimaryKey, BelongsTo } from 'sequelize-typescript';
import Job from './job.model';
import Status from './status.model';

@Table({ timestamps: true })
export default class JobStatus extends Model {

	@PrimaryKey
	@ForeignKey(() => Job)
	@Column
	jobId: number;

	@PrimaryKey
	@ForeignKey(() => Status)
	@Column
	statusId: number;

}