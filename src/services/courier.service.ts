import CourierToken from "../models/CourierToken";
import { CourierTokenRepository } from "../repository/CourierTokenRepository";

export class CourierService {
  private courierTokenRepository: CourierTokenRepository;

  constructor() {
    this.courierTokenRepository = new CourierTokenRepository();
  }

  async getDestinations() {
    try {
    } catch (error) {}
  }

  async getCourierToken() {
    try {
      const token = await this.courierTokenRepository.findCompany(
        "courierPlus"
      );
      console.log(token);
    } catch (error) {
      console.log(error)
    }
  }
}
