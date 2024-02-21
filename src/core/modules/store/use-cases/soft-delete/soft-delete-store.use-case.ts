import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { FindByIdStoreUseCase } from '../find-by-id';
import { StoreRepository } from '../../store.repository';

@Injectable()
export class SoftDeleteStoreUseCase implements UseCaseBase<string, boolean> {
  constructor(
    private readonly findByIdStoreUseCase: FindByIdStoreUseCase,
    private readonly storeRepository: StoreRepository,
  ) {}

  async execute(data: string): Promise<boolean> {
    const store = await this.findByIdStoreUseCase.execute(data);

    const remove = await this.storeRepository.softDelete(store.id);

    if (!remove)
      throw new HttpException('Failed to remove.', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
