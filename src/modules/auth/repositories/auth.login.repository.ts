import { Injectable } from '@nestjs/common';
import { Auth} from 'src/database/entities-index';
import { paginate } from 'src/lib/paginate/paginate.service';
import { PaginateDto } from 'src/lib/paginate/paginate.type';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthRepository extends Repository<Auth> {
  constructor(private dataSouce: DataSource) {
    super(Auth, dataSouce.createEntityManager());
  }
  async list(paginateDto: PaginateDto) {
    return await paginate<Auth>(this, paginateDto);
  }
}
