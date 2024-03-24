import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { UserPasswordService } from './user/services/user-password.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/life-is-a-highway'),
    UserModule,
  ],
  controllers: [],
  providers: [UserPasswordService],
})
export class AppModule {}
