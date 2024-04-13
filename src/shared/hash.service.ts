import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly saltOrRounds: number = 10;

  async encrypt(value: string): Promise<string> {
    return await bcrypt.hash(value, this.saltOrRounds);
  }

  async isMatch(value: string, source: string): Promise<boolean> {
    return await bcrypt.compare(value, source);
  }
}
