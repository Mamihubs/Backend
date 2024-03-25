import { DeleteOneDto, AllSeachDto, UpdateOneDto } from "../dto/GeneralDto";
import SalesRepository from "./../repository/SalesRepository";

export default class SalesService extends SalesRepository {
  constructor() {
    super();
  }

  async createSales(data: object) {
    try {
      return await this.Create(data);
    } catch (error) {
      console.log(error);
    }
  }

  async updateSales(id: string, data: UpdateOneDto) {
    try {
      return await this.UpdateOne({ _id: id, update: data });
    } catch (error) {
      console.log(error);
    }
  }
  async deleteSales(data: DeleteOneDto) {
    try {
      return await this.DeleteOne(data._id);
    } catch (error) {
      console.log(error);
    }
  }
  async getAllSales(option?: AllSeachDto) {
    try {
      return await this.FindAll(option);
    } catch (error) {
      console.log(error);
    }
  }
}
