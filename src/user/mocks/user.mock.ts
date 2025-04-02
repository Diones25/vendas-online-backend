import { UserEntity } from "../entities/user.entity";
import { USerType } from "../enum/user-type.emu";

export const UserEntityMock: UserEntity = {
  cpf: '1234566',
  createdAt: new Date(),
  email: '2Z6yM@example.com',
  id: 1,
  name: 'Teste',
  password: '123456',
  phone: '123456',
  typeUser: USerType.USER,
  updatedAt: new Date()
}