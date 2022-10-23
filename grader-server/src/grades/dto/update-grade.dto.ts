import { PartialType } from '@nestjs/mapped-types';
import { CreateGradeDto } from './create-grade.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGradeDto extends PartialType(CreateGradeDto) {
  @IsOptional()
  @IsNumber()
  minPercentage?: number;

  @IsOptional()
  @IsString()
  symbolicGrade?: string;

  @IsOptional()
  @IsString()
  descriptiveGrade?: string;
}
