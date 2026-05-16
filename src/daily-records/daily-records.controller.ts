import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { DailyRecordsService } from './daily-records.service';
import { CreateDailyRecordDto } from './dto/create-daily-record.dto';

@Controller('daily-records')
export class DailyRecordsController {
  constructor(private readonly dailyRecordsService: DailyRecordsService) {}

  // Endpoint para guardar los clics del usuario
  @Post('save-click')
  async saveClick(@Body() createDailyRecordDto: CreateDailyRecordDto) {
    return this.dailyRecordsService.registerClick(createDailyRecordDto);
  }

  // Endpoint para alimentar la tarjeta "Mi Día" al cargar el Front
  @Get('today')
  async getToday(
    @Query('userId') userId: number,
    @Query('fecha') fecha: string,
  ) {
    return this.dailyRecordsService.findTodayRecord(+userId, fecha);
  }
}
