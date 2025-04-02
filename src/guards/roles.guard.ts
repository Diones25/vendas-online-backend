import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { LoginPayload } from "../auth/dtos/loginPayload.dto";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { USerType } from "../user/enum/user-type.emu";


@Injectable()
export class RolesGuard implements CanActivate{
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService
  ) { }
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<USerType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass(),]
    );

    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;

    const loginPayload: LoginPayload | undefined = await this.jwtService.verifyAsync(authorization, {
      secret: process.env.JWT_SECRET
    }).catch(() => undefined);


    if (!LoginPayload) {
      return false;
    }

    return requiredRoles.some((role) => role === loginPayload?.typeUser);
  }
}