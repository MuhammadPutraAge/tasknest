import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks() {
    return await this.tasksService.getTasks();
  }

  @Post()
  async createTask(@Body() body: CreateTaskDto) {
    return await this.tasksService.createTask(body);
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.getTaskById(id);
  }

  @Put(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskDto,
  ) {
    return await this.tasksService.updateTask(id, body);
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.deleteTask(id);
  }
}
