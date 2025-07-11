import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { HabitTrackingService } from './habit-tracking.service';
import { MarkHabitDto } from './dto/mark-habit.dto';

@Controller('habit-tracking')
export class HabitTrackingController {
  constructor(private readonly habitTrackingService: HabitTrackingService) {}

  @Get(':userId/:timeKey')
  getHabitTracking(
    @Param('userId') userId: string,
    @Param('timeKey') timeKey: string,
  ) {
    return this.habitTrackingService.getHabitTracking(userId, timeKey);
  }

  @Get(':userId/month/:year/:month')
  getHabitTrackingForMonth(
    @Param('userId') userId: string,
    @Param('year') year: string,
    @Param('month') month: string,
  ) {
    return this.habitTrackingService.getHabitTrackingForMonth(
      userId,
      parseInt(year),
      parseInt(month),
    );
  }

  @Post(':userId/mark')
  @HttpCode(HttpStatus.OK)
  markHabit(
    @Param('userId') userId: string,
    @Body() markHabitDto: MarkHabitDto,
  ) {
    return this.habitTrackingService.markHabit(userId, markHabitDto);
  }

  @Post(':userId/mark-today')
  @HttpCode(HttpStatus.OK)
  markHabitForToday(
    @Param('userId') userId: string,
    @Body() body: { habitKey: string; value: boolean },
  ) {
    return this.habitTrackingService.markHabitForToday(
      userId,
      body.habitKey,
      body.value,
    );
  }
}
