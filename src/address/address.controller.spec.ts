import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create-address.dto';



describe('AddressController', () => {
  let addressController: AddressController;
  let addressService: AddressService;

  const mockUserService = {
    createAddress: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        {
          provide: AddressService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    addressController = module.get<AddressController>(AddressController);
    addressService = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(addressController).toBeDefined();
  });

  describe('createAddress', () => {
    it('should createAddress a address', async () => {
      const userId = 1; // Mock user ID

      const createAddressDto: CreateAddressDto = { 
        complement: 'Apt 101',
        numberAddress: 123,
        cep: '12345-678',
        cityId: 1,
      };
      const createdUser = { id: 1, ...createAddressDto };
      mockUserService.createAddress.mockResolvedValue(createdUser);

      const result = await addressController.createAddress(userId, createAddressDto);

      expect(result).toEqual(createdUser);
      expect(mockUserService.createAddress).toHaveBeenCalled();
    });
  });
});