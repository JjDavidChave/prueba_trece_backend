import { Injectable } from '@nestjs/common';
import { Users } from 'src/database/entities/users';
import { paginate } from 'src/lib/paginate/paginate.service';
import { PaginateDto } from 'src/lib/paginate/paginate.type';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(private dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }
  async list(paginateDto: PaginateDto) {
    return await paginate<Users>(this, paginateDto);
  }
}
