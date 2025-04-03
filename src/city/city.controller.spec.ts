import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';


describe('CityController', () => {
  let userController: CityController;
  let cityService: CityService;

  const mockUserService = {
    getAllCitiesbyStateId: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        {
          provide: CityService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<CityController>(CityController);
    cityService = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('getAllCitiesbyStateId', () => {
    it('should find a city', async () => {
      const stateId = 1;
      const cityEntity: CityEntity[] = [
        {
          id: 1,
          name: 'City 1',
          stateId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      mockUserService.getAllCitiesbyStateId.mockResolvedValue(cityEntity);

      const result = await userController.getAllCitiesbyStateId(stateId);

      expect(result).toEqual(cityEntity);
      expect(mockUserService.getAllCitiesbyStateId).toHaveBeenCalledWith(stateId);
    });
  });
});