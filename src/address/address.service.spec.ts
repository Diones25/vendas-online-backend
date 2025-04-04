import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AddressEntity } from "./entities/address.entity";
import { addressMock } from "./mocks/address.mock";
import { UserEntityMock } from "../user/mocks/user.mock";
import { CityEntityMock } from "../city/mocks/city.mock";
import { createAddressMock } from "./mocks/create-address.mock";
import { AddressService } from "./address.service";
import { UserService } from "../user/user.service";
import { CityService } from "../city/city.service";

describe('AddressService', () => {
  let addressService: AddressService;
  let userService: UserService;
  let cityService: CityService;
  let addressRepository: Repository<AddressEntity>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockReturnValue(UserEntityMock),
          }
        },
        {
          provide: CityService,
          useValue: {
            findCityById: jest.fn().mockReturnValue(CityEntityMock),
          }
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockReturnValue(addressMock),
          }
        }
      ],
    }).compile();

    addressService = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    addressRepository = module.get<Repository<AddressEntity>>(getRepositoryToken(AddressEntity));
  });

  it('should be defined', () => {
    expect(addressService).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it('should return address after save', async () => {
    const address = await addressService.createAddress(createAddressMock, UserEntityMock.id);
    expect(address).toEqual(addressMock);
  });

  it('should return error if exception in userService', async () => {
    jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new Error());
    expect(addressService.createAddress(createAddressMock, UserEntityMock.id)).rejects.toThrowError();
  });

  it('should return error if exception in cityService', async () => {
    jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new Error());
    expect(addressService.createAddress(createAddressMock, UserEntityMock.id)).rejects.toThrowError();
  });

});