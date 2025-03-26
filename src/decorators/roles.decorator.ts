import { SetMetadata } from "@nestjs/common";
import { USerType } from "src/user/enum/user-type.emu";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: USerType[]) => SetMetadata(ROLES_KEY, roles);