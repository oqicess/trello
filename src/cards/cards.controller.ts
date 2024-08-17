import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { Auth } from '../decorators/auth.decorator';
import { CurrentUser } from '../decorators/user.decorator';
import { ColumnOwnershipGuard } from '../guards/ownership.guard';
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';

@ApiTags('card-controller')
@Controller('users')
export class CardsController {
    constructor(private readonly cardService: CardsService) {}

    @ApiOperation({
        summary: 'Получение карточек пользователя по индентификатору',
    })
    @ApiBearerAuth()
    @Get(':id/cards')
    @UsePipes(ValidationPipe)
    async getUserColumns(@Param('id') userId: number) {
        return this.cardService.findAll(userId);
    }

    @ApiOperation({ summary: 'Создание карточки' })
    @UsePipes(ValidationPipe)
    @ApiBearerAuth()
    @Post('/cards')
    @Auth()
    create(
        @CurrentUser('id') id: number,
        @Body() createCardDto: CreateCardDto,
    ) {
        return this.cardService.create(id, createCardDto);
    }

    @ApiOperation({ summary: 'Изменение карточки' })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Идентификатор карточки',
    })
    @ApiParam({
        name: 'userId',
        type: Number,
        description: 'Идентификатор пользователя',
    })
    @ApiBody({ type: UpdateCardDto })
    @ApiBearerAuth()
    @Patch(':userId/cards/:id')
    @UsePipes(ValidationPipe)
    @UseGuards(ColumnOwnershipGuard)
    @Auth()
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCardDto) {
        return this.cardService.update(id, dto);
    }

    @ApiOperation({ summary: 'Удаление карточки' })
    @ApiBearerAuth()
    @ApiParam({
        name: 'userId',
        type: Number,
        description: 'Идентификатор пользователя',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Идентификатор колонки',
    })
    @Delete(':userId/cards/:id')
    @Auth()
    @UsePipes(ValidationPipe)
    @UseGuards(ColumnOwnershipGuard)
    async remove(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.cardService.remove(userId, id);
    }
}
