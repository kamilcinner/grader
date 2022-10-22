import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGradeDto {
  @IsNumber()
  minPercentage: number;

  @IsString()
  symbolicGrade: string;

  @IsOptional()
  @IsString()
  descriptiveGrade: string;
}
