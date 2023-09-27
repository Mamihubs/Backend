import { UpdateManyDto, UpdateOneDto, searchDto, AllSeachDto } from "../dto/GeneralDto";
import UserModel from "../models/User";

export default class VendorRepository {

  // Find one Vendor
  async FindOne(search: searchDto) {
    try {
      return await UserModel.findOne({ [search.field]: search.value })
    } catch (error) {
      console.log(error)
    }
  }

  // Find many vendors
  async FindMany(search: object) {
    try {
      return await UserModel.find({ ...search });
    } catch (error) {
      console.log(error)
    }
  }

  // Find all vendors
  async FindAll(options?: AllSeachDto) {
    try {
      const query: any = { }; // when no search is pass
      if (options) {
        for (const key in options) {
          if (options.hasOwnProperty(key)) {
            query[key] = options[key];
          }
        }
      }
      return await UserModel.find(query)
    } catch (error) {
      console.log(error)
    }
  }

}