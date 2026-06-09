import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { DailyRecord } from '../daily-records/entities/daily-record.entity'; // Ajusta la ruta

@Module({
  imports: [TypeOrmModule.forFeature([DailyRecord])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}