import { Types } from "mongoose";
import RoleModel, { RoleModelType } from "../models/RoleModel";
import { RoleRequestInterface } from "../services/Interfaces/RoleServiceInterface";

export default class RoleReepository {
    public async findById(id : string ) {
        return await RoleModel.findOne({_id : new Types.ObjectId(id)})
    }

    public async getAll(): Promise <RoleModelType[]|[]> {
        return await RoleModel.find()
    }

    public async create(role : RoleRequestInterface ):  Promise <RoleModelType|null> {
        const  roleModel = new RoleModel({...role});

        return await roleModel.save();
    }

    public async update(name : string , id : string):  Promise <RoleModelType|null> {
        let permission = await this.findById(id);

        if(!permission) return null;

        permission.name = name;

        return await permission.save();
    }

    public async delete(id : string) {
        return await RoleModel.deleteOne({_id : new Types.ObjectId(id)})
    }
}