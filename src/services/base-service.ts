import { Repository } from 'typeorm';
import { BaseEntity } from '../entity/base-entity';
import { Page } from '../model/page';
import { PaginationParams } from '../model/pagination';

export abstract class BaseService<T extends BaseEntity> {
  protected constructor(protected readonly repository: Repository<T>) {}

  async paginate<T>(
    items: T[],
    paginationParams: PaginationParams,
    totalElements: number,
  ): Promise<Page<T>> {
    const totalPages = Math.ceil(totalElements / paginationParams.size);
    const currentPage = paginationParams.page;
    const size = paginationParams.size;
    const numberOfElements = items.length;
    const first = currentPage === 1;
    const last = currentPage === totalPages;

    return {
      content: items,
      totalElements,
      totalPages,
      size,
      number: currentPage,
      numberOfElements,
      first,
      last,
    };
  }

  async findAll(paginationParams: PaginationParams) {
    const pagination = new PaginationParams(
      paginationParams.page,
      paginationParams.size,
      paginationParams.sort,
    );
    const [items, totalElements] = await this.repository.findAndCount({
      skip: pagination.page * pagination.size,
      take: pagination.size,
    });

    return this.paginate<T>(items, pagination, totalElements);
  }
}
