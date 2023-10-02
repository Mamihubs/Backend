import { LocationDto, RegionDto } from './../dto/LocationDto';
import { DeleteOneDto } from '../dto/GeneralDto';
import { LocationRepository } from '../repository/LocationRepository';


export class LocationService{
    private locationRepository: LocationRepository;
    private regionRepository: LocationRepository;

    constructor(){
        this.locationRepository = new LocationRepository('Location');
        this.regionRepository = new LocationRepository('Region');
    }

    async createRegion(data: RegionDto){
        try {
            const newdata = await this.regionRepository.Create(data);
            return newdata;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllRegion(){
        try {
            const newdata = await this.regionRepository.FindAll();
            return newdata;
        } catch (error) {
            console.log(error);
        }
    }

    async getOneRegion(id: string){
        try {
            const newdata = await this.regionRepository.FindOne({field: '_id', value: id});
            return newdata;
        } catch (error) {
            console.log(error);
        }
    }

    async updateRegion(id: string,data: RegionDto){
        try {
            const newdata = await this.regionRepository.UpdateOne({_id: id, update: data});
            return newdata;
        } catch (error) {
            console.log(error);
        }
    }

    async createLocation(data: RegionDto){
        try {
            const newdata = await this.locationRepository.Create(data);
            return newdata;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllLocation(){
        try {
            const newdata = await this.locationRepository.FindAll();
            return newdata;
        } catch (error) {
            console.log(error);
        }
    }

    async getOneLocation(id: string){
        try {
            const newdata = await this.locationRepository.FindOne({field: '_id', value: id});
            return newdata;
        } catch (error) {
            console.log(error);
        }
    }

    async updateLocation(id: string,data: RegionDto){
        try {
            const newdata = await this.locationRepository.UpdateOne({_id: id, update: data});
            return newdata;
        } catch (error) {
            console.log(error);
        }
    }

    async bulkCreate(data: LocationDto[]){
        try {
            const importedData = await this.locationRepository.CreateMany(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    
}