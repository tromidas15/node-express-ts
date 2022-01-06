import { UserModelType } from "../models/userModel";
import UserRepository from "../Repositories/UserRepository";

export default class Auth {
    private id : string;
    private userRepository : UserRepository;
    private user : UserModelType|null = null;

    constructor (id : string) {
        this.id = id;
        this.userRepository = new UserRepository();
    }

    public async getUser() : Promise<UserModelType|null> {
        if(!this.user) {
            this.user = await this.userRepository.findUserById(this.id);
        }

        return this.user;
    }
}