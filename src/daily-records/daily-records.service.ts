import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyRecord } from './entities/daily-record.entity';
import { CreateDailyRecordDto } from './dto/create-daily-record.dto';

@Injectable()
export class DailyRecordsService {
  constructor(
    @InjectRepository(DailyRecord)
    private readonly dailyRecordRepository: Repository<DailyRecord>,
  ) {}

  // 📝 Ahora recibe 'userId' como segundo parámetro obligatorio
  async registerClick(createDailyRecordDto: CreateDailyRecordDto, userId: number) {
    // Ya no extraemos userId de createDailyRecordDto
    const { fecha, estadoEmocional, estadoEnergia, estadoDolor } = createDailyRecordDto;   
    
    // 1. Buscamos si ya existe el registro del día usando el ID SEGURO
    let record = await this.dailyRecordRepository.findOne({
      where: { user: { id: userId }, fecha },
    });

    if (record) {
      if (estadoEmocional !== undefined) record.estadoEmocional = estadoEmocional;
      if (estadoEnergia !== undefined) record.estadoEnergia = estadoEnergia;
      if (estadoDolor !== undefined) record.estadoDolor = estadoDolor;
    } else {
      // 3. NO EXISTE: Creamos el registro vinculando el ID seguro
      record = this.dailyRecordRepository.create({
        fecha,
        user: { id: userId },
        estadoEmocional: estadoEmocional ?? null,
        estadoEnergia: estadoEnergia ?? null,
        estadoDolor: estadoDolor ?? null,
      });
    }

    return await this.dailyRecordRepository.save(record);
  }

  async findTodayRecord(userId: number, fecha: string) {
    const record = await this.dailyRecordRepository.findOne({
      where: { user: { id: userId }, fecha },
    });
    
    if (!record) {
      return { message: 'No hay registros para el día de hoy.' };
    }
    
    return record;
  }
}

