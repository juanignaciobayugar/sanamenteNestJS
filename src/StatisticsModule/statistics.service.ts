import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { DailyRecord } from '../daily-records/entities/daily-record.entity'; // Ajusta la ruta

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(DailyRecord)
    private readonly dailyRecordRepository: Repository<DailyRecord>,
  ) {}

  async getUserStats(userId: number) {
    const hoy = new Date();
    
    // Configurar rangos de fechas (Semanas = 7 días atrás, Mes = 30 días atrás)
    const hace7Dias = new Date();
    hace7Dias.setDate(hoy.getDate() - 7);
    
    const hace30Dias = new Date();
    hace30Dias.setDate(hoy.getDate() - 30);

    // Formatear a string 'YYYY-MM-DD' que es como lo guardas en tu entidad
    const formatFecha = (d: Date) => d.toISOString().split('T')[0];

    // 1. Obtener registros de la última semana y del último mes
    const registrosSemana = await this.fetchRecords(userId, formatFecha(hace7Dias), formatFecha(hoy));
    const registrosMes = await this.fetchRecords(userId, formatFecha(hace30Dias), formatFecha(hoy));

    return {
      semanal: this.calcularMetricas(registrosSemana),
      mensual: this.calcularMetricas(registrosMes),
    };
  }

  private async fetchRecords(userId: number, fechaInicio: string, fechaFin: string) {
    return await this.dailyRecordRepository.find({
      where: {
        user: { id: userId },
        fecha: Between(fechaInicio, fechaFin),
      },
    });
  }

  private calcularMetricas(records: DailyRecord[]) {
    if (records.length === 0) {
      return {
        estadoEmocionalPredominante: 'Sin datos',
        promedioEnergia: 0,
        promedioDolor: 0,
        totalRegistros: 0,
      };
    }

    let sumaEnergia = 0;
    let conteoEnergia = 0;
    let sumaDolor = 0;
    let conteoDolor = 0;
    
    // Para sacar el estado emocional que más se repite (Moda)
    const emocionesConteo: Record<number, number> = {};

    records.forEach((r) => {
      // Energía
      if (r.estadoEnergia !== null && r.estadoEnergia !== undefined) {
        sumaEnergia += r.estadoEnergia;
        conteoEnergia++;
      }
      // Dolor
      if (r.estadoDolor !== null && r.estadoDolor !== undefined) {
        sumaDolor += r.estadoDolor;
        conteoDolor++;
      }
      // Emoción
      if (r.estadoEmocional !== null && r.estadoEmocional !== undefined) {
        emocionesConteo[r.estadoEmocional] = (emocionesConteo[r.estadoEmocional] || 0) + 1;
      }
    });

    // Mapeo de IDs de emoción a su texto descriptivo
    const mapaEmociones: Record<number, string> = {
      1: 'Bien',
      2: 'Regular',
      3: 'Mal',
      4: 'Estupendo',
    };

    // Calcular la emoción que más se repitió
    let emocionPredominanteId = 'Sin datos';
    let maxConteo = 0;
    for (const [id, conteo] of Object.entries(emocionesConteo)) {
      if (conteo > maxConteo) {
        maxConteo = conteo;
        emocionPredominanteId = mapaEmociones[Number(id)] || 'Desconocido';
      }
    }

    return {
      estadoEmocionalPredominante: emocionPredominanteId,
      promedioEnergia: conteoEnergia > 0 ? Number((sumaEnergia / conteoEnergia).toFixed(1)) : 0,
      promedioDolor: conteoDolor > 0 ? Number((sumaDolor / conteoDolor).toFixed(1)) : 0,
      totalRegistros: records.length,
    };
  }
}