import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserEmailService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async checkIfEmailAlreadyExists(userEmail: string) {
    const emailAlreadyExists = await this.findUserByEmail(userEmail);

    return !!emailAlreadyExists;
  }

  private async findUserByEmail(userEmail: string) {
    return await this.userModel.findOne({ email: userEmail }).exec();
  }
}
