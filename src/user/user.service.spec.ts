import { Test } from "@nestjs/testing";
import { UserService } from "./user.service";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntityMock } from "./mocks/user.mock";
import { createUserMock } from "./mocks/create-user.mock";

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockReturnValue(UserEntityMock),
            save: jest.fn().mockReturnValue(UserEntityMock),
          }
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findUserByEmail', async () => {
    const user = await service.findByEmail(UserEntityMock.email);
    expect(user).toEqual(UserEntityMock);
  });

  it('should return error in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
    expect(service.findByEmail(UserEntityMock.email)).rejects.toThrowError();
  });

  it('should return error in findUserByEmail (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    expect(service.findByEmail(UserEntityMock.email)).rejects.toThrowError();
  });

  it('should return user in findUserById', async () => {
    const user = await service.findUserById(UserEntityMock.id);
    expect(user).toEqual(UserEntityMock);
  });

  it('should return error in findUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockReturnValue(Promise.resolve(null));
    expect(service.findUserById(UserEntityMock.id)).rejects.toThrowError();
  });

  it('should return error in findUserById (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    expect(service.findUserById(UserEntityMock.id)).rejects.toThrowError();
  });

  it('should return user in getUserByIdUsingRelations', async () => {
    const user = await service.getUserByIdUsingRelations(UserEntityMock.id);
    expect(user).toEqual(UserEntityMock);
  });

  it('should return error if user exist', async () => {
    expect(service.create(createUserMock)).rejects.toThrowError();
  });

  it('should return user if not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
    const user = await service.create(createUserMock);
    expect(user).toEqual(UserEntityMock);
  });

});