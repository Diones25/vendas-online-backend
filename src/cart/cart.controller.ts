import { Controller } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { USerType } from 'src/user/enum/user-type.emu';

@Roles(USerType.USER)
@Controller('cart')
export class CartController {}
