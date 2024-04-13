// transactional.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class TransactionalInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isTransactional = Reflect.getMetadata(
      'isTransactional',
      context.getHandler(),
    );
    if (!isTransactional) {
      return next.handle(); // Not marked @Transactional, proceed normally
    }

    const queryRunner = this.dataSource.createQueryRunner();
    let manager: EntityManager;
    return new Observable((subscriber) => {
      queryRunner
        .connect()
        .then(() => queryRunner.startTransaction())
        .then(() => {
          manager = queryRunner.manager;
          const httpContext = context.switchToHttp();
          httpContext.getRequest().manager = manager; // Make manager available in request object
          return next.handle().toPromise();
        })
        .then((result) => {
          subscriber.next(result); // Proceed to next after successful execution
          return queryRunner.commitTransaction();
        })
        .catch(async (error) => {
          subscriber.error(error); // Handle error
          if (queryRunner.isTransactionActive) {
            await queryRunner.rollbackTransaction();
          }
        })
        .finally(() => {
          subscriber.complete(); // Complete the observable
          queryRunner.release();
        });
    });
  }
}
