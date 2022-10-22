import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade) private readonly repo: Repository<Grade>,
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    await this.checkIfMinPercentageIsAlreadyUsed(createGradeDto.minPercentage);

    const grade = this.repo.create(createGradeDto);
    return this.repo.save(grade);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, updateGradeDto: UpdateGradeDto) {
    const grade = await this.checkIfGradeWithIdExists(id);
    await this.checkIfMinPercentageIsAlreadyUsed(updateGradeDto.minPercentage);

    Object.assign(grade, updateGradeDto);
    return this.repo.save(grade);
  }

  async remove(id: string) {
    const grade = await this.checkIfGradeWithIdExists(id);

    return this.repo.remove(grade);
  }

  private async checkIfGradeWithIdExists(id: string) {
    const grade = await this.findOne(id);
    if (!grade) {
      throw new NotFoundException('grade not found');
    }
    return grade;
  }

  private async checkIfMinPercentageIsAlreadyUsed(minPercentage: number) {
    const gradesWithSameMinPercentage = await this.repo.findBy({
      minPercentage,
    });

    if (gradesWithSameMinPercentage.length) {
      throw new BadRequestException({
        statusCode: 409,
        errorCode: 'AS014',
        errorMessage: 'Minimum percentage value is already used!',
      });
    }
  }
}
