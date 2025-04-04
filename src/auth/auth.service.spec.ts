import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserEntity } from '../user/entities/user.entity';
import { validatePassword } from '../utils/password';
import { LoginPayload } from './dtos/loginPayload.dto';
import { ResponseUserDto } from '../user/dtos/response-user.dto';
import { loginUserMock } from './mocks/login-user-mock';
import { UserEntityMock } from './mocks/user.mock';

jest.mock('../utils/password', () => ({
  validatePassword: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('login', () => {
    it('should return accessToken and user on successful login', async () => {
      const user: UserEntity = { id: 1, email: 'test@example.com', password: 'hashedPassword' } as UserEntity;
      const accessToken = 'mockAccessToken';

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      (validatePassword as jest.Mock).mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockImplementation((payload: LoginPayload) => {
        const expectedPayload = new LoginPayload(user);
        expect(payload).toEqual(expectedPayload);
        return accessToken;
      });

      const result = await authService.login(loginUserMock);

      expect(userService.findByEmail).toHaveBeenCalledWith(loginUserMock.email);
      expect(jwtService.sign).toHaveBeenCalledWith(new LoginPayload(user));
      expect(result).toEqual({
        accessToken,
        user: new ResponseUserDto(user),
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(undefined as unknown as UserEntity);

      await expect(authService.login(loginUserMock)).rejects.toThrow(NotFoundException);
      expect(userService.findByEmail).toHaveBeenCalledWith(loginUserMock.email);
    });

    it('should throw NotFoundException if password does not match', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(UserEntityMock);
      (validatePassword as jest.Mock).mockResolvedValue(false);

      await expect(authService.login(loginUserMock)).rejects.toThrow(NotFoundException);
      expect(userService.findByEmail).toHaveBeenCalledWith(loginUserMock.email);
      expect(validatePassword).toHaveBeenCalledWith(loginUserMock.password, UserEntityMock.password);
    });
  });
});