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
import { Auth } from '../decorators/auth.decorator';
import { CurrentUser } from '../decorators/user.decorator';
import { ColumnOwnershipGuard } from '../guards/ownership.guard';
import { CreateCommentDto } from './dto/createComment.dto';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/updateComment.dto';

@ApiTags('comment-controller')
@Controller('users')
export class CommentsController {
    constructor(private readonly commentService: CommentsService) {}

    @ApiOperation({
        summary: 'Получение комментариев пользователя по индентификатору',
    })
    @ApiBearerAuth()
    @UsePipes(ValidationPipe)
    @Get(':id/comments')
    async getUserColumns(@Param('id') userId: number) {
        return this.commentService.findAll(userId);
    }

    @ApiOperation({ summary: 'Создание комментария' })
    @UsePipes(ValidationPipe)
    @ApiBearerAuth()
    @Post('/comments')
    @Auth()
    create(
        @CurrentUser('id') id: number,
        @Body() createCommentDto: CreateCommentDto,
    ) {
        return this.commentService.create(id, createCommentDto);
    }

    @ApiOperation({ summary: 'Изменение комментария' })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Идентификатор комментария',
    })
    @ApiParam({
        name: 'userId',
        type: Number,
        description: 'Идентификатор пользователя',
    })
    @ApiBody({ type: UpdateCommentDto })
    @ApiBearerAuth()
    @Patch(':userId/comments/:id')
    @UsePipes(ValidationPipe)
    @UseGuards(ColumnOwnershipGuard)
    @Auth()
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCommentDto,
    ) {
        return this.commentService.update(id, dto);
    }

    @ApiOperation({ summary: 'Удаление комментария' })
    @ApiBearerAuth()
    @ApiParam({
        name: 'userId',
        type: Number,
        description: 'Идентификатор пользователя',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Идентификатор комментария',
    })
    @Delete(':userId/comments/:id')
    @Auth()
    @UsePipes(ValidationPipe)
    @UseGuards(ColumnOwnershipGuard)
    async remove(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.commentService.remove(userId, id);
    }
}
