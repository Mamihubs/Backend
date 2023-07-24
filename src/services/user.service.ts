import { UserRepository } from './../repository/UserRepository';
import bcrypt from "bcryptjs"
import { CreateNewUserDto } from "../dto/UserDto";
import { ProfileRepository } from '../repository/ProfileRepository';

export class UserService{
    constructor(private userRepository: UserRepository,
        private profileRepository: ProfileRepository){
        // this.userRepository = new UserRepository()
        // this.profileRepository = new ProfileRepository()
    }
    async createUser(newUser: CreateNewUserDto){
        try {
            const newProfileData = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.login
            }
            const profile = await this.profileRepository.Create(newProfileData);
            const newUserData = {
                fullName: newUser.firstName+' '+newUser.lastName,
                login: newUser.login,
                password: await bcrypt.hash(newUser.password, 10),
                profileID: profile?._id
            }
            const user = await this.userRepository.Create(newUserData);
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async getOneUser(field:string,text:string){
        try {
            return await this.userRepository.FindOne({field:field,value:text});
        } catch (error) {
            console.log(error);
        }
    }

    async matchpassword(enteredPassword: string,databasePassword: string){
        try {
            return bcrypt.compare(enteredPassword,databasePassword);
        } catch (error) {
            console.log(error);
        }
    }
}