import { StateEntityMock } from "../../state/mocks/state.mock";
import { CityEntity } from "../entities/city.entity";

export const CityEntityMock: CityEntity = {
  id: 1,
  name: 'Teste',
  stateId: StateEntityMock.id,
  createdAt: new Date(),
  updatedAt: new Date()
}