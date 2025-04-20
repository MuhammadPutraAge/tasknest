import { Injectable } from '@nestjs/common';
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
    return await this.prismaService.task.findUnique({ where: { id } });
  }

  async updateTask(id: number, task: UpdateTaskDto) {
    const selectedTask = await this.getTaskById(id);

    if (!selectedTask) return null;

    return await this.prismaService.task.update({ where: { id }, data: task });
  }

  async deleteTask(id: number) {
    const selectedTask = await this.getTaskById(id);

    if (!selectedTask) return null;

    return await this.prismaService.task.delete({ where: { id } });
  }
}
