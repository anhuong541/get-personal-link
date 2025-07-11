import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class MarkHabitDto {
  @IsNumber()
  day: number;

  @IsString()
  habitKey: string;

  @IsBoolean()
  value: boolean;

  @IsString()
  timeKey: string;
}
