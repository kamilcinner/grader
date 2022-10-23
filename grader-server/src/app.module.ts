import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GradesModule } from './grades/grades.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './grades/entities/grade.entity';

@Module({
  imports: [
    GradesModule,
    TypeOrmModule.forRoot({
      synchronize: true,
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Grade],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
