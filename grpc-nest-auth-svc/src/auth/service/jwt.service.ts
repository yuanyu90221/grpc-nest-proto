import { Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Auth } from '../auth.entity';

@Injectable()
export class JwtService {
  @InjectRepository(Auth)
  private readonly repository: Repository<Auth>;

  private readonly jwt: Jwt;
  constructor(jwt: Jwt) {
    this.jwt = jwt;
  }

  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  public async validateUser(decoded: any): Promise<Auth> {
    return this.repository.findOne({ where: { id: decoded.id } });
  }

  public generateToken(auth: Auth): string {
    return this.jwt.sign({ id: auth.id, email: auth.email });
  }

  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  public encodePassword(passowrd: string): string {
    const salt: string = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(passowrd, salt);
  }

  public async verify(token: string): Promise<any> {
    try {
      return this.jwt.verify(token);
    } catch (error) {
      throw error;
    }
  }
}
