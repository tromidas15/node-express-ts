import BaseController from "./BaseController";
import { Request, Response } from "express";
import RoleService from "../services/RoleService";
import RoleValidator from "../validators/RoleValidator";

export default class RoleController extends BaseController {
  private roleService: RoleService;
  private roleValidator: RoleValidator;

  constructor(resp: Response) {
    super(resp);
    this.roleService = new RoleService();
    this.roleValidator = new RoleValidator();
  }

  public async get(id: string): Promise<Response> {
    let permission = this.roleService.get(id);

    if (!permission) return this.entityNotFound();

    return this.successResponse(permission);
  }

  public async getAll(request: Request): Promise<Response> {
    let permission = await this.roleService.getAll();

    if (!permission) return this.entityNotFound();

    return this.successResponse(permission);
  }

  public async create(req: Request): Promise<Response> {
    try {
      let validationErrors = this.roleValidator.validateCreate(req.body);

      if (null !== validationErrors) {
        return this.errorResponse(validationErrors);
      }

      let permission = await this.roleService.create(req.body);

      return this.successResponse(permission);
    } catch (exception) {
      return this.serverError();
    }
  }

  public update(req: Request) {}

  public async delete(id: string): Promise<Response> {
    try {
      return this.successResponse(await this.roleService.delete(id));
    } catch (e) {
      return this.serverError();
    }
  }
}
