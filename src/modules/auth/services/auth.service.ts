import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { CreateAuthDto } from '../types/auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto, LoginAuthResponse } from '../types/auth.login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async create(createUserDto: CreateAuthDto) {
    try {
      const { password, ...rest } = createUserDto;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await this.authRepository.save({
        ...rest,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      console.log('Data is not saved in the database');
      throw error;
    }
  }

  async loginUser(loginUserDto: LoginAuthDto): Promise<LoginAuthResponse> {
    const { email, password } = loginUserDto;
    const user = await this.authRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
