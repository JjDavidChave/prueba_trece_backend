import { Injectable } from '@nestjs/common';
import { Role } from 'src/database/entities/role';
import { paginate } from 'src/lib/paginate/paginate.service';
import { PaginateDto } from 'src/lib/paginate/paginate.type';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }
  async list(paginateDto: PaginateDto) {
    return await paginate<Role>(this, paginateDto);
  }
}
