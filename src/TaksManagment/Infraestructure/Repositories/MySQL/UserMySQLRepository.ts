import { User } from "../../../Domain/Entities/User";
import { IUser } from "../../../Domain/Ports/IUser";
import { comparePassword, generateSessionToken, hashPassword, validateSecurePassword } from "../../Helpers/Function";
import { UserModel } from "../../Models/MySQL/UserModelMySQL";

export class UserMySQLRepository implements IUser {
    async register(user: User): Promise<any> {
        try {  
            if(!validateSecurePassword(user.password)){
                return {
                    status: 400,
                    message: "The password must be strong."
                }
            }

            const userReponse = await UserModel.create({
                uuid: user.uuid,
                name: user.name,
                email: user.email,
                password: await hashPassword(user.password)
            });
            return {
                status: 201,
                data: userReponse.toJSON()
            }
        } catch (error:any) {
            return {
                status: 500,
                error: error.errors[0].message
            }
        }
    }

    async login(email: string, password: string): Promise<any> {
        try {
            let user = await UserModel.findOne({ where: { email: email } });
            if(!user){
                return {
                    status: 404,
                    message: 'The user was not found.'
                }
            }
            const userResponse = user.toJSON();
            const { password: _, ...userWithoutPassword } = userResponse;
    
            const isPasswordValid = await comparePassword(password, user.dataValues.password);
            if (!isPasswordValid) {
                return {
                    status: 400,
                    message: 'Password incorrect.'
                };
            }
    
            user.sesionToken = await generateSessionToken(user.uuid);
            await user.save();
    
            return {
                status: 200,
                data: userWithoutPassword
            };
    
        } catch (error:any) {
            return {
                status: 500,
                error: error.errors[0].message
            }
        }
    }

    async logout(uuid: string): Promise<any> {
        try {
            const user = await UserModel.findByPk(uuid);
            if(!user){
                return {
                    status: 404,
                    message: 'The user was not found.'
                }
            }

            user.sesionToken = null;
        
            let userObj = user.toJSON();

            const { password, ...userResponse } = userObj;

            await user.save();
            return {
                status: 200,
                data: userResponse
            }
        } catch (error:any) {
            return {
                status: 500,
                error: error
            }
        }
    }

}