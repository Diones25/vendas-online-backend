import { StateEntity } from "../entities/state.entity";

export class ResponseStateDto {
  name: string;

  constructor(state: StateEntity) {
    this.name = state.name;
  }
}