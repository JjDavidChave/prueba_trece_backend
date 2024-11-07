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
import {
  CreateRoleDto,
  CreateRoleSchema,
  RoleResponse,
  UpdateRoleDto,
  UpdateRoleSchema,
} from '../types/role.dto';
import { PaginateDto, PaginateSchema } from 'src/lib/paginate/paginate.type';
import { PaginateResponse } from 'src/lib/paginate/paginate.service';
import { RoleService } from '../services/role.service';

@Controller('entrance')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/')
  async create(
    @Body(new JoiValidationPipe(CreateRoleSchema))
    body: CreateRoleDto,
  ): Promise<RoleResponse> {
    return await this.roleService.create(body);
  }

  @Get('/')
  async list(
    @Query(new JoiValidationPipe(PaginateSchema)) params: PaginateDto,
  ): Promise<PaginateResponse<RoleResponse>> {
    return await this.roleService.list(params);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(UpdateRoleSchema))
    body: UpdateRoleDto,
  ): Promise<RoleResponse> {
    return await this.roleService.update(id, body);
  }

  @Delete('/:id')
  async delete(
    @Param('id')
    id: string,
  ): Promise<RoleResponse> {
    return await this.roleService.delete(id);
  }
}
