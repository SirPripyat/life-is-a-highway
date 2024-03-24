import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserPasswordService {
  private readonly saltRounds = 10;

  public async getPasswordHash(password: string) {
    return await this.createPasswordHash(password);
  }

  private async createPasswordHash(password: string) {
    return await bcrypt.hash(password, this.saltRounds);
  }
}
