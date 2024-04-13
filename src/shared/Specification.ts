import { BaseEntity } from '../entity/base-entity';
import { SelectQueryBuilder } from 'typeorm';

export interface Specification<T extends BaseEntity> {
  criteria(queryBuilder: SelectQueryBuilder<T>): SelectQueryBuilder<T>;
}
