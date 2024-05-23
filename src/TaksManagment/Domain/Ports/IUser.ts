import { User } from "../Entities/User";

export interface IUser {
    register(user:User):Promise<User|any>;
    login(email:string, password:string):Promise<User|any>;
    logout(uuid:string):Promise<any>;
}