import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEntity } from './entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {

  constructor(
    @InjectRepository(StateEntity)
    private stateRepository: Repository<StateEntity>,
  ) {}

  async getAllStates(): Promise<StateEntity[]> {
    return this.stateRepository.find();
  }
}
