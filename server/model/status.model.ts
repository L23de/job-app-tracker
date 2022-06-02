import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import User from './user.model';
import Job from './job.model';
import JobStatus from './jobStatus.model';

@Table({ timestamps: true })
export default class Status extends Model {

	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@Column({ allowNull: false })
	name: string;

	@Column({ type: DataType.INTEGER, allowNull: false })
	color: number;

	// @ForeignKey(() => User)
	// @Column
	// userId: number;

	// @BelongsTo(() => User, 'id')
	// user: User;

	@BelongsToMany(() => Job, () => JobStatus, 'id', 'jobId')
	jobs: Array<Job & {JobStatus: JobStatus}>;

}