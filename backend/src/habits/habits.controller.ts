import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { UpdateHabitsOrderDto } from './dto/update-habits-order.dto';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post(':userId')
  create(
    @Param('userId') userId: string,
    @Body() createHabitDto: CreateHabitDto,
  ) {
    return this.habitsService.create(userId, createHabitDto);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.habitsService.findAll(userId);
  }

  @Get(':userId/:habitId')
  findOne(@Param('userId') userId: string, @Param('habitId') habitId: string) {
    return this.habitsService.findOne(userId, habitId);
  }

  @Patch(':userId/:habitId')
  update(
    @Param('userId') userId: string,
    @Param('habitId') habitId: string,
    @Body() updateHabitDto: UpdateHabitDto,
  ) {
    return this.habitsService.update(userId, habitId, updateHabitDto);
  }

  @Delete(':userId/:habitId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('userId') userId: string, @Param('habitId') habitId: string) {
    return this.habitsService.remove(userId, habitId);
  }

  @Patch(':userId/order')
  @HttpCode(HttpStatus.OK)
  updateOrder(
    @Param('userId') userId: string,
    @Body() updateHabitsOrderDto: UpdateHabitsOrderDto,
  ) {
    return this.habitsService.updateOrder(
      userId,
      updateHabitsOrderDto.habitIds,
    );
  }
}
