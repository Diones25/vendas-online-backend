import { IsEmail, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { IsCPF } from "class-validator-cpf";
import { UserEntity } from "../entities/user.entity";
import { ResponseAddressDto } from "src/address/dtos/response-address.dto";

export class ResponseUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  addresses?: ResponseAddressDto[];

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.cpf = user.cpf;
    this.addresses = user.addresses
      ? user.addresses.map(address => new ResponseAddressDto(address))
      : undefined;
  }
}