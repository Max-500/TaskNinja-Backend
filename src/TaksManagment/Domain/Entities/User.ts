import { v4 as uuidv4 } from 'uuid';

export class User {
    uuid:string;
    name:string;
    email:string;
    password:string;
    sesionToken?:string;

    constructor(name:string, email:string, password:string, sesionToken?:string){
        this.uuid = this.generateUuid();
        this.name = name;
        this.email = email;
        this.password = password;
        this.sesionToken = sesionToken;
    }

    generateUuid():string {
        return uuidv4();
    }
}