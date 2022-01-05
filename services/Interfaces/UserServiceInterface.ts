export interface UserResponse {
    token: string,
    user : UserDataType
}

type UserDataType = {
    id : string,
    email : string
}