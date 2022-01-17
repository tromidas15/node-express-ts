import UserRegisterValidator from "../validators/registerValidation"
import { Request , Response } from "express";
import UserService from '../services/userService';
import BaseController from "./BaseController";
import {ErrorFormat} from "./Interfaces"
import { decode } from "jsonwebtoken";
 
export default class UserController extends BaseController {

    private userService: UserService;
    private validator : UserRegisterValidator;

    constructor (resp : Response) {
        super(resp);
        this.userService = new UserService();
        this.validator = new UserRegisterValidator();
    }

    public async register (request:Request): Promise<Response> {
        const {name, email, password} = request.body;

        const error : ErrorFormat[]|null  = this.validator.validateCreate(request.body);

        if (error) {
            return this.errorResponse(error);
        }

        try{
            let data = await this.userService.create(name, email, password)
            return this.successResponse(data, null);
        }catch(err) {
            return this.apiErrorResponse(err)
        }
    }

    public async login(request:Request): Promise<Response> {
        const {email , password} = request.body;
         const token = await this.userService.loginUser(email, password);

        if(!token) {
            return this.errorResponse([{field : "GeneralError" , value : "credencials.invalid"}])
        }

        return this.successResponse({jwt : token})   
    }

    public async update(request:Request): Promise<Response> {
        const {name, email} = request.body;

        const error : ErrorFormat[]|null  = this.validator.validateUpdate(request.body);
        const token : any= decode(request.header('auth-token') ?? '');

        if(!token) {
            return this.forbiddenResponse();
        }
        
        if (error) {
            return this.errorResponse(error);
        }

        try{
            let data = await this.userService.updateUser(request.params.id ,name, email)

            return this.successResponse(data, null);
        }catch(err) {
            return this.apiErrorResponse(err)
        }
    }
}