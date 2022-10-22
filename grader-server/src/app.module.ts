import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GradesModule } from './grades/grades.module';

@Module({
  imports: [GradesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
