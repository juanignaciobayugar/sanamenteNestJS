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

  async registerClick(createDailyRecordDto: CreateDailyRecordDto) {
    const { userId, fecha, estadoEmocional, estadoEnergia, estadoDolor } = createDailyRecordDto;   
    // 1. Buscamos si ya existe el registro del día
    let record = await this.dailyRecordRepository.findOne({
      where: { user: { id: userId }, fecha },
    });

    if (record) {
      // 2. SI EXISTE: Modificación dinámica (Modifica, pisa o setea en null si se deshace)
      // Usamos 'undefined' para saber si el campo NI SIQUIERA SE TOCÓ en el front.
      // Si viene el campo (ya sea con número o null), actualizamos la base de datos.
      if (estadoEmocional !== undefined) record.estadoEmocional = estadoEmocional;
      if (estadoEnergia !== undefined) record.estadoEnergia = estadoEnergia;
      if (estadoDolor !== undefined) record.estadoDolor = estadoDolor;
    } else {
      // 3. NO EXISTE: Es el primer clic del día, creamos el registro
      record = this.dailyRecordRepository.create({
        fecha,
        user: { id: userId },
        estadoEmocional: estadoEmocional ?? null,
        estadoEnergia: estadoEnergia ?? null,
        estadoDolor: estadoDolor ?? null,
      });
    }

    // Guardamos los cambios. Si todos los estados quedaron en null porque el usuario desmarcó todo,
    // opcionalmente podrías borrar la fila, pero dejarla en null para ese día no afecta los promedios.
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

