import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  label: string;

  @IsNumber()
  @IsOptional()
  order: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(1)
  goal: number;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsOptional()
  tag?: string;

  @IsOptional()
  category?: string;
}
