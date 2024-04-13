import { BaseEntity } from '../entity/base-entity';
import { Page } from '../model/page';
import { PaginationParams } from '../model/pagination';
import { BaseRepository } from '../repository/base-repository';
import { FindOptionsWhere } from 'typeorm';

export abstract class BaseService<T extends BaseEntity> {
  protected constructor(protected readonly repository: BaseRepository<T>) {}

  async pagination<T>(
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

  async paginate(paginationParams: PaginationParams, relations: string[]) {
    const pagination = new PaginationParams(
      paginationParams.page,
      paginationParams.size,
      paginationParams.sort,
    );
    const [items, totalElements] = await this.repository.findAndCount({
      skip: pagination.page * pagination.size,
      take: pagination.size,
      relations,
    });

    return this.pagination<T>(items, pagination, totalElements);
  }

  async findById(id: number): Promise<T> {
    return this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }
}
