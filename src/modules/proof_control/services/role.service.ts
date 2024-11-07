import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../repositories/role.repository';
import {
  CreateRoleDto,
  RoleResponse,
  UpdateRoleDto,
} from '../types/role.dto';
import { PaginateDto } from 'src/lib/paginate/paginate.type';
import { PaginateResponse } from 'src/lib/paginate/paginate.service';
import { ServiceError } from 'src/lib/error/error.type';
import HRMErrors from 'src/htm.errors';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = await this.roleRepository.save(createRoleDto)
      return role
    } catch (error) {
      console.log('Data is not save MallQuinta01', error);
      throw error;
    }
  }

  async list(
    paginateDto: PaginateDto,
  ): Promise<PaginateResponse<RoleResponse>> {
    return await this.roleRepository.list(paginateDto);
  }

  async update(
    id: string,
    payload: UpdateRoleDto,
  ): Promise<RoleResponse> {
    try {
      const entrance = await this.roleRepository.findOne({
        where: { id },
      });
      if (!entrance) {
        throw new ServiceError(HRMErrors.ROLE_NOT_EXISTS());
      }
      Object.assign(entrance, { ...payload });
      const updateEntrance = await this.roleRepository.save(entrance);
      return updateEntrance;
    } catch (error) {
      throw new ServiceError(HRMErrors.ROLE_UPDATE_NOT_EXISTS());
    }
  }

  async delete(id: string): Promise<RoleResponse> {
    const entrance = await this.roleRepository.findOne({
      where: { id },
    });
    if (!entrance) {
      throw new ServiceError(HRMErrors.ROLE_NOT_EXISTS());
    }
    await this.roleRepository.delete({ id });
    return entrance;
  }
}
