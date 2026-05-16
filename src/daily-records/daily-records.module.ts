import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. IMPORTA ESTO
import { DailyRecordsService } from './daily-records.service';
import { DailyRecordsController } from './daily-records.controller';
import { DailyRecord } from './entities/daily-record.entity'; // 2. IMPORTA TU ENTIDAD

@Module({
  imports: [
    // 3. AGREGA ESTO EN LOS IMPORTS:
    TypeOrmModule.forFeature([DailyRecord]),
  ],
  controllers: [DailyRecordsController],
  providers: [DailyRecordsService],
})
export class DailyRecordsModule {}