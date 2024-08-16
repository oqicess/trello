import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { CurrentUser } from '../decorators/user.decorator';
import { UserDto } from './user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ColumnService } from '../column/column.service';

@ApiTags('user-controller')
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private columnService: ColumnService,
    ) {}

    @ApiOperation({ summary: 'Получение профиля' })
    @ApiBearerAuth()
    @Get()
    @Auth()
    async profile(@CurrentUser('id') id: number) {
        return this.userService.getById(id);
    }

    @ApiOperation({ summary: 'Редактирование профиля' })
    @ApiBearerAuth()
    @UsePipes(ValidationPipe)
    @Patch()
    @Auth()
    async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
        return this.userService.update(id, dto);
    }

    @ApiOperation({ summary: 'Получение профиля по индентификатору' })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Идентификатор пользователя',
    })
    @ApiBearerAuth()
    @Get('/:id')
    @Auth()
    async profileGetById(@Param('id') id: number) {
        return this.userService.getById(id);
    }

    @ApiOperation({
        summary: 'Получение колонок пользователя по индентификатору',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Идентификатор пользователя',
    })
    @ApiBearerAuth()
    @Get(':id/columns')
    async getUserColumns(@Param('id') userId: number) {
        return this.columnService.findAll(userId);
    }
}
