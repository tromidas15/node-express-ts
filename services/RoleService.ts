import { RoleModelType } from "../models/RoleModel";
import RoleReepository from "../Repositories/RoleRepository";
import { RoleRequestInterface } from "./Interfaces/RoleServiceInterface";

export default class RoleService {
    private roleRepository : RoleReepository;

    constructor() {
        this.roleRepository = new RoleReepository();
    }

    public async get(id : string) :Promise<RoleModelType|null> {
        return await this.roleRepository.findById(id);
    }

    public async getAll() : Promise <RoleModelType[]|[]> {
        return await this.roleRepository.getAll();
    }

    public async create(role : RoleRequestInterface):  Promise <RoleModelType|null>  {
        return await this.roleRepository.create(role);
    }

    public async delete(id : string) {
        return await this.roleRepository.delete(id)
    }
}