import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('card-controller')
@Controller('cards')
export class CardsController {}
