import { getConnection } from 'typeorm';
import { serialize } from 'v8';
import { User } from "../entity/User";


export interface UserInterface {
    // getOne: (email: number) => Promise<User | null>;
    getAll: () => Promise<User[]>;
    add: (user: User) => Promise<void>;
    // update: (user: User) => Promise<void>;
    // delete: (id: number) => Promise<void>;
}

class UserInt implements UserInterface {

    public async getAll(): Promise<User[]> {
        try {
            const db = await getConnection().manager.find(User)
            console.log("data"+db);
            return db;
        } catch (err) {
            throw err;
        }
    }
    public async add(user: User): Promise<void> {
        return {} as any;
    }

}

export default UserInt;