import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { JoiValidationPipe } from 'src/lib/JoiValidationPipe';
import { PaginateDto, PaginateSchema } from 'src/lib/paginate/paginate.type';
import { PaginateResponse } from 'src/lib/paginate/paginate.service';
import {
  UserDtoResponse,
  CreateUserDto,
  CreateUserSchema,
  UpdateUserDto,
  UpdateUserSchema,
} from '../types/users.dto';
import { UsersService } from '../services/users.service';

@Controller('users_control')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  async create(
    @Body(new JoiValidationPipe(CreateUserSchema))
    body: CreateUserDto,
  ): Promise<UserDtoResponse> {
    return await this.usersService.create(body);
  }

  @Get('/')
  async list(
    @Query(new JoiValidationPipe(PaginateSchema)) params: PaginateDto,
  ): Promise<PaginateResponse<UserDtoResponse>> {
    return await this.usersService.list(params);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(UpdateUserSchema))
    body: UpdateUserDto,
  ): Promise<UserDtoResponse> {
    return this.usersService.update(id, body);
  }

  @Delete('/:id')
  async delete(
    @Param('id')
    id: string,
  ): Promise<UserDtoResponse> {
    return await this.usersService.delete(id);
  }
}
