import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";
import { StateService } from "./state.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { StateEntity } from "./entities/state.entity";
import { StateEntityMock } from "./mocks/state.mock";

describe('StateService', () => {
  let service: StateService;
  let stateRepository: Repository<StateEntity>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [StateService,
        {
          provide: getRepositoryToken(StateEntity),
          useValue: {
            find: jest.fn().mockReturnValue([StateEntityMock])
          }
        }
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    stateRepository = module.get<Repository<StateEntity>>(getRepositoryToken(StateEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(stateRepository).toBeDefined();
  });

  it('should return list of state', async () => {
    const states = await service.getAllStates();  
    expect(states).toEqual([StateEntityMock]);
  });

  it('should return error in exception', async () => {
    jest.spyOn(stateRepository, 'find').mockRejectedValueOnce(new Error());
    expect(service.getAllStates()).rejects.toThrow();
  });
});