import * as Nedb from 'nedb';
import { UserCredentials } from '../Models/ServerModels';

export class UserCredentialsDbAccess {

    private nedb: Nedb;

    constructor(nedb = new Nedb('databases/UsersCredentials.db')) {
        this.nedb = nedb;
        this.nedb.loadDatabase();
    }

    public async putUserCredential(usersCredentials: UserCredentials): Promise<any> {
        return new Promise((resolve, reject) => {
            this.nedb.insert(usersCredentials, (err: Error | null, docs: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }

    public async getUserCredential(username: string, password: string): Promise<UserCredentials | undefined> {
        return new Promise((resolve, reject) => {
            this.nedb.find({ username: username, password: password }, (err: Error | null, docs: UserCredentials[]) => {
                if (err) {
                    return reject(err);
                } else {
                    if (docs.length == 0) {
                        return resolve(undefined);
                    } else {
                        return resolve(docs[0]);
                    }
                }
            });
        });
    }

    public async removeUserCredential({username, password}: UserCredentials): Promise<void | Error> {
        return new Promise((resolve, reject) => {
            this.nedb.remove({ username, password }, (err: Error | null, usersRemoved: number) => {
                if (err) {
                    return reject(err);
                } else {
                    if (usersRemoved == 0) {
                        return resolve(new Error('UserCredentials not deleted!'));
                    } else {
                        return resolve();
                    }
                }
            });
        });
    }


}