import { Response } from "express";
import { PaginationInterface, ErrorFormat ,ResponseFormat  } from "./Interfaces";

export default abstract class BaseController {
    private resp : Response;
    constructor(resp : Response) {
        this.resp = resp
    }
    public successResponse(data:any, pagination: null|PaginationInterface = null): Response {
        return this.resp.status(200).json(this.buildRessponse(data,  pagination))  
    }
    
    public errorResponse(errors : ErrorFormat[]): Response {
        return this.resp.status(400).json(this.buildRessponse(null,  null , true , errors))  
    }

    public apiErrorResponse(error: any): Response {
        return this.resp.status(404).json(error)  
    }

    protected buildRessponse(data : any , pagination : null|PaginationInterface = null, isError : boolean = false, errorMessages : null|ErrorFormat[] = null) : ResponseFormat {
        return {
            data,
            isError,
            errorMessages,
            pagination,
        }
    }
}
