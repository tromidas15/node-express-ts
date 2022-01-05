import userModel, { UserModelType } from "../models/userModel";
import * as byCript from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "dotenv"
import process from "process"
import { UserResponse } from "./Interfaces/UserServiceInterface";
import UserRepository from "../Repositories/UserRepository";

export default class UserService {
    private userRepository : UserRepository
    constructor () {
        config();
        this.userRepository = new UserRepository();
    }

    async create( name: string, email: string, password: string) {
            password = await this.encryptPassword(password);
            const user = new userModel({
                name, email, password 
            });
        
            const data = await user.save();
            return data;
    }

    async updateUser( id:string ,name: string, email: string) : Promise<UserModelType|null> {

        const user = await this.userRepository.updateUser(id ,email, name )

        return user;
    }

    async loginUser(email: string , password: string ): Promise<UserResponse|boolean> {
        let user = await userModel.findOne({email : email});
        if(!user){
            return false;
        }
        let passwodMatches = await byCript.compare(password, user.password);
    
        if(!passwodMatches){
            return false;
        }

        return this.buildSuccessUserResponse(user);
    }


    private buildSuccessUserResponse(user : any) : UserResponse {
        if(!process.env.APP_SECRET) {
            throw new Error ('App secret not set please add APP_SECRET to .env')
        }
        let token = sign({_id : user._id}  , process.env.APP_SECRET ?? 'dsauhdgoidiibgtibtrngidrnikn');

        return {
            token : token,
            user : {
                id : user._id,
                email : user.email
            }
        }
    }

    private async encryptPassword(password: string) : Promise<string> {
        let salt = await byCript.genSalt(12);
        return await byCript.hash(password , salt);
    }
}