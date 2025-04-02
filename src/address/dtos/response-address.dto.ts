import { ResponseCityDto } from "../../city/dtos/response-city.dto";
import { AddressEntity } from "../entities/address.entity";

export class ResponseAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;
  city?: ResponseCityDto

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city ? new ResponseCityDto(address.city) : undefined
  }
}