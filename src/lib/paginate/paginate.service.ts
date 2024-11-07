import { FindOptionsOrder, ObjectLiteral, Repository } from 'typeorm';
import { PaginateDto } from './paginate.type';

export interface PaginateResponse<Entity> {
  data: Partial<Entity[]>;
  pagination: {
    total_records: number;
    current_page: number;
    total_pages: number;
  };
}

export async function paginate<Entity extends ObjectLiteral>(
  repository: Repository<Entity>,
  filter: PaginateDto,
  //   where: WhereOptions
): Promise<PaginateResponse<Entity>> {
  let order: FindOptionsOrder<Entity> = {};
  const { orderBy, sortOrder, page, limit } = filter;

  if (orderBy) {
    const orderJson = JSON.parse(orderBy) ?? null;
    order = { ...order, ...orderJson };
  }

  if (!orderBy && sortOrder) {
    order = { ...order, createdAt: sortOrder };
  }

  const data = await repository.findAndCount({
    order: order,
    skip: (page - 1) * limit,
    take: limit,
    // where,
  });

  const total_pages =
    data[1] % limit === 0 ? data[1] / limit : Math.trunc(data[1] / limit + 1);

  return {
    pagination: {
      current_page: page,
      total_records: data[1],
      total_pages: Number(total_pages),
    },
    data: data[0],
  };
}
