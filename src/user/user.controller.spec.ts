import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ResponseUserDto } from './dtos/response-user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    getUserByIdUsingRelations: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = { 
        name: 'John Doe', 
        email: 'john@example.com', 
        phone: '1234567890', 
        cpf: '123.456.789-00', 
        password: 'securePassword123' 
      };
      const createdUser = { id: 1, ...createUserDto };
      mockUserService.create.mockResolvedValue(createdUser);

      const result = await userController.createUser(createUserDto);

      expect(result).toEqual(createdUser);
      expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '', cpf: '123456'},
        { id: 2, name: 'John Doe', email: 'john@example.com', phone: '', cpf: '123456'},
      ];
      mockUserService.findAll.mockResolvedValue(users);

      const result = await userController.findAll();

      expect(result).toEqual(users.map(user => new ResponseUserDto({ ...user, phone: '', cpf: '123456', password: '', typeUser: 1, createdAt: new Date(), updatedAt: new Date() })));
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });

  describe('findUserById', () => {
    it('should return a user if found', async () => {
      const user = { id: 1, name: 'John Doe', email: 'john@example.com', phone: '', cpf: '123456' };
      mockUserService.getUserByIdUsingRelations.mockResolvedValue(user);

      const result = await userController.findUserById(1);

      expect(result).toEqual(new ResponseUserDto({ ...user, phone: '', cpf: '123456', password: '', typeUser: 1, createdAt: new Date(), updatedAt: new Date() }));
      expect(mockUserService.getUserByIdUsingRelations).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUserService.getUserByIdUsingRelations.mockResolvedValue(null);

      await expect(userController.findUserById(1)).rejects.toThrow(
        new NotFoundException('Usuário com ID 1 não encontrado'),
      );
      expect(mockUserService.getUserByIdUsingRelations).toHaveBeenCalledWith(1);
    });
  });
});