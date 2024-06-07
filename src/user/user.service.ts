import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
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

  async findUsersByIds(usersIds: string[]) {
    const users = await this.userRepository.find({
      where: { id: In(usersIds) },
    });

    return users;
  }

  async create({ email, password, username, role }: CreateUserDTO) {
    try {
      const user = await this.userRepository.save({
        email,
        username,
        password_hash: await hash(password, 10),
        role,
      });

      return user;
    } catch (e) {
      this.handleError(e);
    }
  }

  private handleError(e: any) {
    console.error(e);

    if (e?.code === 'ER_DUP_ENTRY') {
      throw new BadRequestException(
        'Já existe um usuário cadastrado com essas informações',
      );
    }

    throw new Error('Não foi possível realizar o cadastro');
  }
}
