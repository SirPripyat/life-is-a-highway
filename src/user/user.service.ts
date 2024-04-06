import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserPasswordService } from './services/user-password.service';
import { UserEmailService } from './services/user-email.service';
import { UserMessages } from './enums/user-messages.enum';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async create(createUserDto: CreateUserDto) {
    await this.generatePassword(createUserDto);
    await this.validateEmail(createUserDto.email);

    return await this.userModel.create(createUserDto);
  }

  public async findAll() {
    return this.userModel.find();
  }

  private async generatePassword(createUserDto: CreateUserDto) {
    const userPasswordService = new UserPasswordService();

    return (createUserDto.password = await userPasswordService.getPasswordHash(
      createUserDto.password,
    ));
  }

  private async validateEmail(userEmail: string) {
    const userEmailService = new UserEmailService(this.userModel);
    const isEmailAlreadyExist =
      await userEmailService.checkIfEmailAlreadyExists(userEmail);

    if (isEmailAlreadyExist)
      throw new HttpException(
        UserMessages.EMAIL_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
  }
}
