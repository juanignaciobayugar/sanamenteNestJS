// 🛡️ Importamos el Guard que maneja tus JWT (adaptá el nombre según cómo se llame en tu app)
import { Controller, Post, Body, Get, Query, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { DailyRecordsService } from './daily-records.service';
import { CreateDailyRecordDto } from './dto/create-daily-record.dto';

@Controller('daily-records')
// Podés poner el Guard acá arriba si querés proteger TODO el controlador completo:
@UseGuards(AuthGuard) 
export class DailyRecordsController {
  constructor(private readonly dailyRecordsService: DailyRecordsService) {}

  // Endpoint para guardar los clics del usuario
  @Post('save-click')
  async saveClick(
    @Body() createDailyRecordDto: CreateDailyRecordDto, 
    @Req() req: any // 👈 Inyectamos el objeto Request de Express
  ) {
    // req.user contiene lo que decodificó el Guard (ej: { username, sub })
    // Tu ID de usuario en el token está en 'sub', se lo pasamos al servicio
    const userId = req.user.sub; 
    
    return this.dailyRecordsService.registerClick(createDailyRecordDto, userId);
  }

  // Endpoint para alimentar la tarjeta "Mi Día" al cargar el Front
  @Get('today')
  async getToday(
    @Query('fecha') fecha: string,
    @Req() req: any // 👈 Lo mismo acá, ya no necesitamos @Query('userId')!
  ) {
    const userId = req.user.sub; // Sacamos el ID real y seguro del Token
    return this.dailyRecordsService.findTodayRecord(userId, fecha);
  }
}
