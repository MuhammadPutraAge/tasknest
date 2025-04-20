import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTasks() {
    return this.prismaService.task.findMany();
  }

  async createTask(task: CreateTaskDto) {
    return await this.prismaService.task.create({ data: task });
  }

  async getTaskById(id: number) {
    const task = await this.prismaService.task.findUnique({ where: { id } });

    if (!task)
      throw new HttpException('Task not found.', HttpStatus.NOT_FOUND, {
        cause: `There is no task with id: ${id}`,
      });

    return task;
  }

  async updateTask(id: number, task: UpdateTaskDto) {
    const selectedTask = await this.getTaskById(id);

    if (!selectedTask)
      throw new HttpException('Task not found.', HttpStatus.NOT_FOUND, {
        cause: `There is no task with id: ${id}`,
      });

    return await this.prismaService.task.update({ where: { id }, data: task });
  }

  async deleteTask(id: number) {
    const selectedTask = await this.getTaskById(id);

    if (!selectedTask)
      throw new HttpException('Task not found.', HttpStatus.NOT_FOUND, {
        cause: `There is no task with id: ${id}`,
      });

    await this.prismaService.task.delete({ where: { id } });
  }
}
