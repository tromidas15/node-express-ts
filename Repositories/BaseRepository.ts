import { QueryWithHelpers, Schema } from "mongoose";

export default abstract class BaseRepository {
    protected applyPagination(builder: any , skip : number , limit : number) {
        return builder.skip(skip).limit(limit)
    }
}