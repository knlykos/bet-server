import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    let userResultSet: User;
    await hash(user.password, 'holaTVT', (err: Error, encrypted: string) => {
      user.password = encrypted;
      console.log(encrypted);
    });
    try {
      this.userRepository.create(user);
      this.userRepository.hasId;
      // eslint-disable-next-line prefer-const
      userResultSet = await this.userRepository.save(user);
    } catch (error) {
      console.log(error);

      if (error.code === '23505') {
        const detail = error.detail.split(/\((.*?)\)/);
        if (detail[1] === 'username') {
          throw `The username already exist`;
        }
        if (detail[1] === 'email') {
          throw `The email already exist`;
        }
        // const error = new Error('')
      }
      if (error.code === '22001') {
        throw 'Value too long';
      } else {
        throw error.message;
      }
      Logger.log('eroor', error);
    }
    // \((.*?)\)
    return userResultSet;
  }
}
