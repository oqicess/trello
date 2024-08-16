import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comment-controller')
@Controller('comments')
export class CommentsController {}
