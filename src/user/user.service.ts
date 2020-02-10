import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    let userResultSet: User;
    this.userRepository.create(user);
    this.userRepository.hasId;
    try {
      userResultSet = await this.userRepository.save(user);
    } catch (error) {
      console.log('errorrr', error);
    }
    return userResultSet;
  }
}
