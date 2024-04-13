import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from '../entity/base-entity';

export class BaseRepository<T extends BaseEntity> extends Repository<T> {
  /**
   * @param id
   * return T
   */
  async findById(id: number): Promise<T> {
    return this.findOneBy({ id } as FindOptionsWhere<T>);
  }
}
