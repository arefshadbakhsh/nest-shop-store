import 'reflect-metadata';

export const Transactional = (): MethodDecorator => {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    console.log('here in set transactional');
    Reflect.defineMetadata('isTransactional', true, descriptor.value);
  };
};