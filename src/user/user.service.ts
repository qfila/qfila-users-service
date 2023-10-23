import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { GetUserDTO } from './dtos/get-user.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser({ id, email }: GetUserDTO): Promise<User> {
    let user: User;

    if (id) user = await this.userRepository.findOneBy({ id });
    if (email) user = await this.userRepository.findOneBy({ email });

    return user;
  }

  async create({ email, password, username }: CreateUserDTO) {
    const user = await this.userRepository.save({
      email,
      username,
      password_hash: await hash(password, 10),
    });

    return user;
  }
}
