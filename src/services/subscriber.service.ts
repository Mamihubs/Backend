import { UserRepository } from "./../repository/UserRepository";
import bcrypt from "bcryptjs";
import { CreateNewUserDto, CreateNewVendorDto } from "../dto/UserDto";
import { ProfileRepository } from "../repository/ProfileRepository";
import { VendorProfileRepository } from "../repository/VendorProfileRepository";
import { SubscriberRepository } from "../repository/SubscriberRepository";
import { CreateSubscriberDto } from "../dto/SubscriberDto";

export class SubscriberService {
  private subscriberRepository: SubscriberRepository;

  constructor() {
    this.subscriberRepository = new SubscriberRepository()
  }
  async insertSubscriber(params: CreateSubscriberDto) {
    try {
      const result = await this.subscriberRepository.Create(params);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getSubscriber(field: string, text: string) {
    try {
      return await this.subscriberRepository.FindOne({ field: field, value: text });
    } catch (error) {
      throw error;
    }
  }

  async deleteSubscriber(field: string, text: string) {
    try {
      return await this.subscriberRepository.DeleteOne({field, value: text });
    } catch (error) {
      throw error;
    }
  }

  async getAllSubscribers({pageSize, pageNumber, sortBy}: { pageSize: number, pageNumber: number, sortBy?: string}) {
    return await this.subscriberRepository.getAllSubscribers({pageSize, pageNumber, sortBy} );
  }

}
