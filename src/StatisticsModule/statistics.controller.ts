import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
// Importa tu JwtAuthGuard o el que uses para proteger rutas de usuario
 import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('statistics')
@UseGuards(AuthGuard) 
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/dashboard')
  async getDashboardStats(@Req() req: any) {
    // Reemplaza req.user.id por la forma en la que obtengas el ID del token/sesión de tu usuario
   const userId = req.user?.sub || req.user?.id;
    return await this.statisticsService.getUserStats(userId);
  }
}