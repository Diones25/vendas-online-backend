import { Test, TestingModule } from '@nestjs/testing';
import { StateController } from './state.controller';
import { StateService } from './state.service';

describe('StateController', () => {
  let stateController: StateController;
  let cityService: StateService;

  const mockUserService = {
    getAllStates: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateController],
      providers: [
        {
          provide: StateService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    stateController = module.get<StateController>(StateController);
    cityService = module.get<StateService>(StateService);
  });

  it('should be defined', () => {
    expect(stateController).toBeDefined();
  });

  describe('getAllStates', () => {

    it('should return an array of cities', async () => {
      const cities = [
        { id: 1, name: 'city1', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'city2', createdAt: new Date(), updatedAt: new Date() },
      ];
      
      mockUserService.getAllStates.mockResolvedValue(cities);

      const result = await stateController.getAllStates();

      expect(result).toEqual(cities);
      expect(mockUserService.getAllStates).toHaveBeenCalled();
    });
  });
});