import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockUserService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should login in', async () => {
      const loginDto: LoginDto = { 
        email: 'test@example.com',
        password: 'password',
      };

      mockUserService.login.mockResolvedValue(loginDto);
      const result = await authController.login(loginDto); 

      expect(result).toEqual(loginDto);
      expect(mockUserService.login).toHaveBeenCalled();
    });
  });
});