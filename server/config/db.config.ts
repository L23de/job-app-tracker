import { Sequelize } from 'sequelize-typescript'
import { Tasks } from '../model/task.model';
import * as pg from 'pg';

export const connect = () => {

    const hostName = process.env.HOST;
    const userName = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const database = process.env.DB;
    const port = parseInt(process.env.DB_PORT);
    const dialect: any = process.env.DIALECT;

    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        port: port,
        dialect,
        // operatorsAliases,
        repositoryMode: true,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    });

    sequelize.addModels([Tasks]);

    const db: any = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    
    return db;

}