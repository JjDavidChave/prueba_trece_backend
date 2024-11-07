import J = require('joi');

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface PaginateDto {
  page: number;
  limit: number;
  sortOrder?: SortOrder;
  orderBy?: string;
}

export const PaginateSchema = J.object({
  page: J.number().min(1).default(1),
  limit: J.number().min(1).default(10),
  sortOrder: J.string()
    .default(SortOrder.DESC)
    .valid(...Object.values(SortOrder))
    .optional(),
  orderBy: J.object().optional(),
});
