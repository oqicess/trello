import {
    Controller,
    Post,
    Body,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    Patch,
    ParseIntPipe,
    UseGuards,
    Get,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { Auth } from '../decorators/auth.decorator';
import { CurrentUser } from '../decorators/user.decorator';
import { CreateColumnDto } from './column.dto';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { ColumnOwnershipGuard } from '../guards/ownership.guard';

@ApiTags('column-controller')
@Controller('users')
export class ColumnController {
    constructor(private readonly columnService: ColumnService) {}

    @ApiOperation({
        summary: 'Получение колонок пользователя по индентификатору',
    })
    @ApiBearerAuth()
    @UsePipes(ValidationPipe)
    @Get(':id/columns')
    async getUserColumns(@Param('id') userId: number) {
        return this.columnService.findAll(userId);
    }

    @ApiOperation({ summary: 'Создание колонки' })
    @UsePipes(ValidationPipe)
    @ApiBearerAuth()
    @Post('/columns')
    @Auth()
    create(
        @CurrentUser('id') id: number,
        @Body() createColumnDto: CreateColumnDto,
    ) {
        return this.columnService.create(id, createColumnDto);
    }

    @ApiOperation({ summary: 'Изменение колонки' })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Идентификатор колонки',
    })
    @ApiParam({
        name: 'userId',
        type: Number,
        description: 'Идентификатор пользователя',
    })
    @ApiBody({ type: CreateColumnDto })
    @ApiBearerAuth()
    @Patch(':userId/columns/:id')
    @UsePipes(ValidationPipe)
    @UseGuards(ColumnOwnershipGuard)
    @Auth()
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body('title') title: string,
    ) {
        return this.columnService.update(id, title);
    }

    @ApiOperation({ summary: 'Удаление колонки' })
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
    @Delete(':userId/columns/:id')
    @Auth()
    @UsePipes(ValidationPipe)
    @UseGuards(ColumnOwnershipGuard)
    async remove(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.columnService.remove(userId, id);
    }
}
