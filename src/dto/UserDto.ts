
export interface CreateUserDto{
    fullName: string;
    login: string;
    password: string;
    type: string;
    profile_id: object;
    created_by: object;
}
