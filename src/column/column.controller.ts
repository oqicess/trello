import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    Patch,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { Auth } from '../decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { CreateColumnDto } from './column.dto';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { ColumnOwnershipGuard } from 'src/guards/ownership.guard';

@ApiTags('column-controller')
@Controller('users')
export class ColumnController {
    constructor(private readonly columnService: ColumnService) {}

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
    @ApiBody({ type: CreateColumnDto })
    @ApiBearerAuth()
    @Patch('/columns/:id')
    @Auth()
    update(@Param() id: number, @Body() title: string) {
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
    @UseGuards(ColumnOwnershipGuard)
    async remove(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.columnService.remove(userId, id);
    }
}
