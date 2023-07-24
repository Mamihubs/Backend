
export interface CreateUserDto{
    fullName: string;
    login: string;
    password: string;
    type?: string;
    profile_id: object;
    created_by?: object;
}

export interface CreateNewUserDto{
    first_name: string;
    last_name: string;
    login: string;
    password: string;
    type?: string;
    created_by?: object;
}