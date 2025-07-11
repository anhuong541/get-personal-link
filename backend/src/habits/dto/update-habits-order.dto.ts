import { IsArray, IsString } from 'class-validator';

export class UpdateHabitsOrderDto {
  @IsArray()
  @IsString({ each: true })
  habitIds: string[];
}
