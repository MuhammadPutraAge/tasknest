import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks() {
    const tasks = await this.tasksService.getTasks();
    return new ResponseHelper('Successfully retrieved all tasks.', tasks);
  }

  @Post()
  async createTask(@Body() body: CreateTaskDto) {
    const task = await this.tasksService.createTask(body);
    return new ResponseHelper('Task created successfully.', task);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number) {
    const task = await this.tasksService.getTaskById(id);

    if (!task)
      throw new HttpException('Task not found.', HttpStatus.NOT_FOUND, {
        cause: `There is no task with id: ${id}`,
      });

    return new ResponseHelper('Successfully retrieved task.', task);
  }

  @Put(':id')
  async updateTask(@Param('id') id: number, @Body() body: UpdateTaskDto) {
    const task = await this.tasksService.updateTask(id, body);

    if (!task)
      throw new HttpException('Task not found.', HttpStatus.NOT_FOUND, {
        cause: `There is no task with id: ${id}`,
      });

    return new ResponseHelper('Task updated successfully.', task);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    const task = await this.tasksService.deleteTask(id);

    if (!task)
      throw new HttpException('Task not found.', HttpStatus.NOT_FOUND, {
        cause: `There is no task with id: ${id}`,
      });

    return new ResponseHelper('Task deleted successfully.', null);
  }
}
