import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersRepository } from './repositorys/user.repository';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UsersRepository],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}